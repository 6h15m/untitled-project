import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';

router.get('/productSelectAll', async function (req, res, next) {
  try {
    const products = await POOL.QUERY`SELECT * FROM products`;
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

export default router;
