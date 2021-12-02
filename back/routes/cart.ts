import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import {
  CartsType,
  DetailedProductOptionPropertyType,
  DetailedProductType,
} from '../../models/cart.interface';
import { ProductType } from '../../models/product.interface';
import { OptionPropertyType } from '../../models/detail.interface';

router.get('/:user_id', async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const cart: CartsType =
      await POOL.QUERY`SELECT * FROM carts WHERE user_id = ${user_id} ORDER BY detailed_product_id DESC`;
    const detailed_products: Array<DetailedProductType> = await POOL.QUERY`SELECT * from detailed_products`;
    const detailed_products_option_properties: Array<DetailedProductOptionPropertyType> =
      await POOL.QUERY`SELECT * from detailed_products_option_properties`;
    const products: Array<ProductType> = await POOL.QUERY`SELECT * FROM products`;
    const option_properties: Array<OptionPropertyType> = await POOL.QUERY`SELECT * FROM option_properties`;
    res.json({
      user_id: user_id,
      cart: cart,
      detailed_products: detailed_products,
      option_properties: option_properties,
      detailed_products_option_properties: detailed_products_option_properties,
      products: products,
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
    await QUERY`DELETE FROM detailed_products WHERE detailed_product_id = ${detailed_product_id}`;
    await COMMIT();
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export default router;
