import { map, pipe, toArray } from "@fxts/core";
import express from "express";
import { GetCart } from "../../models/model.interface";
import POOL from "../database/connect.js";
import { CartsData } from "../types/data.interface";

const router = express.Router();
const { SQL, ASSOCIATE, CL } = POOL;

router.get("/:user_id", async function (req, res, next) {
  try {
    const user_id = req.params.user_id;
    const carts_data: CartsData = await ASSOCIATE`
      carts ${{
        query: SQL`WHERE user_id = ${user_id} ORDER BY detailed_product_id DESC`,
        column: CL("detailed_product_id", "product_amount"),
      }}
        - detailed_product
          - product
          < detailed_products_option_properties
            - option_property
    `;
    const carts: GetCart = {
      user_id: user_id,
      cart: pipe(
        carts_data,
        map((cart) => ({
          product_amount: cart.product_amount,
          detailed_product: {
            id: cart._.detailed_product.id,
            product_id: cart._.detailed_product._.product.id,
            name: cart._.detailed_product._.product.name,
            price: cart._.detailed_product._.product.price,
            option_properties: pipe(
              cart._.detailed_product._.detailed_products_option_properties,
              map((option_property) => ({
                id: option_property._.option_property.id,
                name: option_property._.option_property.name,
                additional_price:
                  option_property._.option_property.additional_price,
              })),
              toArray
            ),
          },
        })),
        toArray
      ),
    };
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteCartProduct", async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const data = req.body;
    const detailed_product_id: number = data.detailed_product_id;
    await QUERY`DELETE FROM detailed_products_option_properties WHERE detailed_product_id = ${detailed_product_id}`;
    await QUERY`DELETE FROM carts WHERE detailed_product_id = ${detailed_product_id}`;
    await QUERY`DELETE FROM detailed_products WHERE id = ${detailed_product_id}`;
    await COMMIT();
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export { router };
