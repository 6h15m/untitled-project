import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { map, pipe, toArray } from '@fxts/core';
const { SQL, ASSOCIATE, CL } = POOL;

router.get('/:user_id', async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const carts_data = await ASSOCIATE`
      carts ${{
        query: SQL`WHERE user_id = ${user_id} ORDER BY detailed_product_id DESC`,
        column: CL('detailed_product_id', 'product_amount'),
      }}
        - detailed_product
          - product
          < detailed_products_option_properties
            - option_property
    `;
    console.log(carts_data[0]._.detailed_product._.detailed_products_option_properties);
    res.json({
      user_id: user_id,
      carts: pipe(
        carts_data,
        map((cart: any) => ({
          product_amount: cart.product_amount,
          detailed_product: {
            id: cart._.detailed_product.id,
            name: cart._.detailed_product._.product.name,
            price: cart._.detailed_product._.product.price,
            option_properties: pipe(
              cart._.detailed_product._.detailed_products_option_properties,
              map((option_property: any) => ({
                id: option_property._.option_property.id,
                name: option_property._.option_property.name,
                additional_price: option_property._.option_property.additional_price,
              })),
              toArray
            ),
          },
        })),
        toArray,
      ),
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteCartProduct', async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const data = req.body;
    const detailed_product_id: number = data.detailed_product_id;
    await QUERY`DELETE FROM detailed_products_option_properties WHERE detailed_product_id = ${detailed_product_id}`;
    await QUERY`DELETE FROM carts WHERE detailed_product_id = ${detailed_product_id}`;
    await QUERY`DELETE FROM detailed_products WHERE id = ${detailed_product_id}`;
    await COMMIT();
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export default router;
