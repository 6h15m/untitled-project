import express from "express";
const router = express.Router();
import POOL from "../database/connect.js";
import { PostCreateType } from "../../models/data.interface";
import { each, toAsync } from "@fxts/core";

router.post("/", async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const {
      small_category_id,
      product_name,
      product_price,
      tags,
      options,
    }: PostCreateType = req.body;
    await QUERY`INSERT INTO products (name, price, small_category_id) VALUES (${product_name}, ${product_price}, ${small_category_id})`;
    await each(async (tag) => {
      tag.name
        ? await QUERY`INSERT INTO tags (id, name) VALUES (${tag.id}, ${tag.name})`
        : "";
    }, toAsync(tags));
    const product_id = (
      await QUERY`SELECT id FROM products ORDER BY id DESC LIMIT 1`
    )[0].id;
    await each(async (tag) => {
      await QUERY`INSERT INTO products_tags (product_id, tag_id) VALUES (${product_id}, ${tag.id})`;
    }, toAsync(tags));
    await each(async (option) => {
      await QUERY`INSERT INTO options (name) VALUES (${option.name})`;
      let option_id = (
        await QUERY`SELECT id FROM options ORDER BY id DESC LIMIT 1`
      )[0].id;
      await QUERY`INSERT INTO products_options (product_id, option_id) 
        VALUES (${product_id}, ${option_id})`;
      await each(async (option_property) => {
        await QUERY`INSERT INTO option_properties (name, additional_price, base, option_id)
            VALUES (${option_property.name}, ${option_property.additional_price}, ${option_property.base}, ${option_id})`;
      }, toAsync(option.option_properties));
    }, toAsync(options));
    await COMMIT();
    res.json({});
  } catch (error) {
    next(error);
    await ROLLBACK();
  }
});

export default router;
