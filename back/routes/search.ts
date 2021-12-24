import { flat, pipe, toArray } from "@fxts/core";
import express from "express";
import POOL from "../database/connect.js";
import { ProductsData, QProductsTagsData } from "../types/data.interface";
import { modifyProductData } from "./main.js";

const router = express.Router();
const { SQL, ASSOCIATE, IN } = POOL;

router.get("/:query", async function (req, res, next) {
  try {
    const query = req.params.query;
    const product_id_data_from_tag: QProductsTagsData = await ASSOCIATE`
      tags ${{
        query: SQL`WHERE UPPER(name) LIKE UPPER(${"%" + query + "%"})`,
      }}
        < products_tags
    `;
    const product_ids_from_tag = pipe(
      product_id_data_from_tag.map((data) =>
        data._.products_tags.map((product_tag) => product_tag.product_id)
      ),
      flat,
      toArray
    );
    const product_data: ProductsData = await ASSOCIATE`
      products ${{
        query: SQL`WHERE UPPER(name) LIKE UPPER(${"%" + query + "%"}) OR ${IN(
          "id",
          product_ids_from_tag
        )}`,
      }}
        < products_tags
          - tag
    `;
    res.json(modifyProductData(product_data));
  } catch (error) {
    next(error);
  }
});

export { router };
