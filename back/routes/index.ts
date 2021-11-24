import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';

router.get('/productSelectAll', function (req, res) {
  (async function productSelectAll() {
    const product = await POOL.QUERY`SELECT * FROM products`;
    res.send({ rows: product });
  })()
    .then(() => {
      process.release;
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
});

router.get('/categorySelectAll', function (req, res) {
  (async function categorySelectAll() {
    const big_categories = await POOL.QUERY`SELECT * FROM big_categories`;
    const small_categories = await POOL.QUERY`SELECT * FROM small_categories`;
    res.send({ big_categories: big_categories, small_categories: small_categories });
  })()
    .then(() => {
      process.release;
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
});

export default router;
