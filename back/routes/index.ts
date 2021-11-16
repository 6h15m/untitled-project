import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';

router.get('/', function (req, res) {
  (async function productSelectAll () {
    const product = await POOL.QUERY`SELECT * FROM products`;
    console.log(product);
    res.render('main', {rows: product});
  })()
    .then(() => {
      process.release;
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
});

router.get('/:small_category_id', function (req, res) {
  const small_category_id = req.params.small_category_id;
  (async function productSelectAll () {
    const product = await POOL.QUERY`SELECT * FROM products WHERE small_category_id = ${small_category_id}`;
    const small_category = await POOL.QUERY`SELECT small_category_name FROM small_categories WHERE small_category_id = ${small_category_id}`;
    const big_category = await POOL.QUERY`SELECT b.big_category_name FROM small_categories AS s, big_categories AS b 
        WHERE s.big_category_id = b.big_category_id AND small_category_id = ${small_category_id}`;
    console.log(product);
    console.log(big_category[0]);
    console.log(small_category[0]);
    res.render('main', {rows: product, small_category: small_category[0], big_category: big_category[0]});
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