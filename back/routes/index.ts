import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { each, pipe, toAsync } from '@fxts/core';
import { SmallCategoryType } from '../../models/category.interface';

router.get('/productSelectAll', async function (req, res, next) {
  try {
    const products = await POOL.QUERY`SELECT * FROM products`;
    res.json({ products: products });
  } catch (error) {
    next(error);
  }
});

router.get('/productSelectByBigCategoryId/:big_category_id', async function (req, res, next) {
  try {
    const big_category_id = req.params.big_category_id;
    const small_categories: Array<SmallCategoryType> =
      await POOL.QUERY`SELECT * FROM small_categories WHERE big_category_id = ${big_category_id}`;
    const products = await pipe(
      small_categories,
      toAsync,
      each(
        async (s) =>
          await POOL.QUERY`SELECT * FROM products WHERE small_category_id = ${s.small_category_id}`,
      ),
    );
    res.json({ products: products });
  } catch (error) {
    next(error);
  }
});

router.get('/productSelectBySmallCategoryId/:small_category_id', async function (req, res, next) {
  try {
    const small_category_id = req.params.small_category_id;
    const products = await POOL.QUERY`SELECT * FROM products WHERE small_category_id = ${small_category_id}`;
    res.json({ products: products });
  } catch (error) {
    next(error);
  }
});

router.get('/categorySelectAll', async function (req, res, next) {
  try {
    const big_categories = await POOL.QUERY`SELECT * FROM big_categories`;
    const small_categories = await POOL.QUERY`SELECT * FROM small_categories`;
    res.json({ big_categories: big_categories, small_categories: small_categories });
  } catch (error) {
    next(error);
  }
});

router.get('/categorySelectBySmallCategoryId/:small_category_id', async function (req, res, next) {
  try {
    const small_category_id = req.params.small_category_id;
    const small_category =
      await POOL.QUERY`SELECT * FROM small_categories WHERE small_category_id = ${small_category_id}`;
    const big_category =
      await POOL.QUERY`SELECT * FROM big_categories WHERE big_category_id = ${small_category[0].big_category_id}`;
    res.json({ big_category: big_category[0], small_category: small_category[0] });
  } catch (error) {
    next(error);
  }
});

export default router;
