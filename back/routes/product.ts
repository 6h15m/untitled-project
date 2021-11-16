import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';

router.get('/:product_id', function(req, res, next) {
  const product_id = req.params.product_id;
  (async function productSelect () {
    const product = await POOL.QUERY`SELECT * FROM products WHERE product_id = ${product_id}`;
    console.log(product);
    res.render('product', {row: product[0]});
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