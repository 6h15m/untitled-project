import express from "express";
const router = express.Router();
import POOL from "../database/connect.js";
import { modifyProductData } from "./main.js";
import { flat, map, pipe, toArray } from "@fxts/core";
const { SQL, ASSOCIATE, IN } = POOL;

router.get("/:query", async function (req, res, next) {
  try {
    const query = req.params.query;
    const product_id_data_from_tag = await ASSOCIATE`
      tags ${{
        query: SQL`WHERE UPPER(name) LIKE UPPER(${"%" + query + "%"})`,
      }}
        < products_tags
    `;
    const product_ids_from_tag = pipe(
      product_id_data_from_tag,
      map((data: any) =>
        pipe(
          data._.products_tags,
          map((product_tag: any) => product_tag.product_id),
          toArray
        )
      ),
      flat,
      toArray
    );
    const product_data = await ASSOCIATE`
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
