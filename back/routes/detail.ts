import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { each, map, pipe, toArray, toAsync } from '@fxts/core';
const { SQL, ASSOCIATE, CL } = POOL;

router.get('/:product_id', async function (req, res, next) {
  try {
    const product_id: number = +req.params.product_id;
    const product_data = await ASSOCIATE`
      products ${{
        query: SQL`WHERE id = ${product_id}`,
        column: CL('id', 'name', 'price'),
      }}
        - small_category ${{
          column: CL('id', 'name'),
        }}
          - big_category
        < products_tags
          - tags
        < products_options
          - options
            < option_properties
    `;
    res.json({
      product: { id: product_data[0].id, name: product_data[0].name, price: product_data[0].price },
      small_category: product_data[0]._.small_category,
      big_category: {
        id: product_data[0]._.small_category._.big_category.id,
        name: product_data[0]._.small_category._.big_category.name,
      },
      tags: pipe(
        product_data[0]._.products_tags,
        map((product_tag: any) => product_tag._.tags),
        toArray,
      ),
      options: pipe(
        product_data[0]._.products_options,
        map((product_option: any) => ({
          id: product_option._.options.id,
          name: product_option._.options.name,
          option_properties: pipe(
            product_option._.options._.option_properties,
            map((option_property: any) => ({
              id: option_property.id,
              name: option_property.name,
              additional_price: option_property.additional_price,
              base: option_property.base,
            })),
            toArray,
          ),
        })),
        toArray,
      ),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/addToCart', async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const { user_id, product_id, option_property_ids, product_amount } = req.body;
    await QUERY`INSERT INTO detailed_products (product_id) VALUES (${product_id})`;
    const detailed_product_ids =
      await QUERY`SELECT id FROM detailed_products WHERE product_id = ${product_id} ORDER BY id DESC`;
    await each(async (option_property_id) => {
      await QUERY`INSERT INTO detailed_products_option_properties (detailed_product_id, option_property_id) 
      VALUES (${detailed_product_ids[0].id}, ${option_property_id})`;
    }, toAsync(option_property_ids));
    await QUERY`INSERT INTO carts (user_id, detailed_product_id, product_amount) 
    VALUES (${String(user_id)}, ${detailed_product_ids[0].id}, ${product_amount})`;
    await COMMIT();
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export default router;
