import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { BigCategoryType, SmallCategoryType } from '../../models/category.interface';
import { TagType } from '../../models/detail.interface';

router.get('/', async function (req, res, next) {
  try {
    const big_categories: Array<BigCategoryType> = await POOL.QUERY`SELECT * FROM big_categories`;
    const small_categories: Array<SmallCategoryType> = await POOL.QUERY`SELECT * FROM small_categories`;
    const tags: Array<TagType> = await POOL.QUERY`SELECT * FROM tags`
    res.json({ big_categories: big_categories, small_categories: small_categories, tags: tags });
  } catch (error) {
    next(error);
  }
});

export default router;
