import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';

router.get('/:user_id', function(req, res, next) {
  const user_id = req.params.user_id;
  (async function userSelect () {
    const user = await POOL.QUERY`SELECT * FROM users WHERE user_id = ${user_id}`;
    console.log(user);
    res.render('cart', {row: user[0]});
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