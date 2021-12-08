import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { modifyProductData } from './index.js';
const { SQL, ASSOCIATE } = POOL;

router.get('/:query', async function (req, res, next) {
  try {
    const query = req.params.query;
    const product_data_from_name = await ASSOCIATE`
      products ${{
        query: SQL`WHERE name LIKE ${'%' + query + '%'}`,
      }}
        < products_tags
          - tag
    `;
    res.json(modifyProductData(product_data_from_name));
  } catch (error) {
    next(error);
  }
});

export default router;
