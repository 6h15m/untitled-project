import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { each, toAsync } from '@fxts/core';

router.get('/:product_id', async function (req, res, next) {
  try {
    const product_id: number = +req.params.product_id;
    const product =
      await POOL.QUERY`SELECT product_id, product_name, product_price FROM products WHERE product_id = ${product_id}`;
    const small_category =
      await POOL.QUERY`SELECT sc.small_category_id, sc.small_category_name, sc.big_category_id FROM small_categories AS sc, products AS p WHERE p.product_id = ${product_id} and sc.small_category_id = p.small_category_id`;
    const big_category =
      await POOL.QUERY`SELECT * FROM big_categories WHERE big_category_id = ${small_category[0].big_category_id}`;
    const tags =
      await POOL.QUERY`SELECT t.tag_id, t.tag_name FROM products_tags AS pt, tags AS t WHERE pt.product_id = ${product_id} AND t.tag_id = pt.tag_id`;
    const options =
      await POOL.QUERY`SELECT o.option_id, o.option_name FROM products_options AS po, options AS o WHERE po.product_id = ${product_id} AND o.option_id = po.option_id`;
    const option_properties_all = await POOL.QUERY`SELECT * FROM option_properties`;
    res.json({
      product: product[0],
      small_category: small_category[0],
      big_category: big_category[0],
      tags: tags,
      options: options,
      option_properties_all: option_properties_all,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/addToCart', async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const data = req.body;
    const user_id = data.user_id;
    const product_id = data.product_id;
    const option_property_ids: Array<number> = data.option_property_ids;
    const product_amount = data.product_amount;

    await QUERY`INSERT INTO detailed_products (product_id) VALUES (${product_id})`;
    const detailed_product_ids =
      await QUERY`SELECT detailed_product_id FROM detailed_products WHERE product_id = ${product_id} ORDER BY detailed_product_id DESC`;
    await each(async (option_property_id) => {
      await QUERY`INSERT INTO detailed_products_option_properties (detailed_product_id, option_property_id) 
      VALUES (${detailed_product_ids[0].detailed_product_id}, ${option_property_id})`;
    }, toAsync(option_property_ids));
    await QUERY`INSERT INTO carts (user_id, detailed_product_id, cart_product_amount) 
    VALUES (${String(user_id)}, ${detailed_product_ids[0].detailed_product_id}, ${product_amount})`;
    await COMMIT();
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export default router;
