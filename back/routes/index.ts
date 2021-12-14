import express from "express";
const router = express.Router();
import POOL from "../database/connect.js";
import { flat, map, pipe, toArray } from "@fxts/core";
const { SQL, ASSOCIATE, CL } = POOL;

export const modifyProductData = (products_data: any) => ({
  products: pipe(
    products_data,
    map((product_data: any) => ({
      id: product_data.id,
      name: product_data.name,
      price: product_data.price,
      small_category_id: product_data.small_category_id,
      tags: pipe(
        product_data._.products_tags,
        map((product_tag: any) => product_tag._.tag),
        toArray
      ),
    })),
    toArray
  ),
});

router.get("/products", async function (req, res, next) {
  try {
    const products_data = await ASSOCIATE`
      products
        < products_tags
          - tag
    `;
    res.json(modifyProductData(products_data));
  } catch (error) {
    next(error);
  }
});

router.get(
  "/productsFromSmallCategoryId/:small_category_id",
  async function (req, res, next) {
    try {
      const small_category_id = +req.params.small_category_id;
      const products_data = await ASSOCIATE`
      products ${{
        query: SQL`WHERE small_category_id = ${small_category_id}`,
      }}
        < products_tags
          - tag
    `;
      res.json(modifyProductData(products_data));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/productsFromBigCategoryId/:big_category_id",
  async function (req, res, next) {
    try {
      const big_category_id = +req.params.big_category_id;
      const products_data = await ASSOCIATE`
      - small_categories ${{
        query: SQL`WHERE big_category_id = ${big_category_id}`,
        column: CL("id"),
      }}
        < products
          < products_tags
            - tag
    `;
      res.json(
        modifyProductData(
          pipe(
            products_data,
            map((data: any) => data._.products),
            flat,
            toArray
          )
        )
      );
    } catch (error) {
      next(error);
    }
  }
);

router.get("/categories", async function (req, res, next) {
  try {
    const big_categories = await POOL.QUERY`SELECT * FROM big_categories`;
    const small_categories = await POOL.QUERY`SELECT * FROM small_categories`;
    res.json({
      big_categories: big_categories,
      small_categories: small_categories,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/tags", async function (req, res, next) {
  try {
    const tags = await POOL.QUERY`SELECT * FROM tags`;
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

export default router;
