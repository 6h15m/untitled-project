import { each, groupBy, map, pipe, toArray, toAsync } from "@fxts/core";
import express from "express";
import { GetDetail } from "../../models/model.interface";
import POOL from "../database/connect.js";
import {
  DetailedProductIdsData,
  DetailedProductsOptionPropertiesIdsData,
  ProductsDetailData,
} from "../types/data.interface";

const router = express.Router();
const { SQL, ASSOCIATE, CL, IN, QUERY } = POOL;

const getDetailedProductId = (
  detailed_product_ids_data: DetailedProductIdsData
) =>
  detailed_product_ids_data.map(
    (detailed_product_id_data) => detailed_product_id_data.detailed_product_id
  );

const isAlreadyInCart = async ({
  user_id,
  product_id,
  option_property_ids,
}: {
  user_id: string;
  product_id: number;
  option_property_ids: Array<number>;
}) => {
  let filtered_detailed_product_ids = getDetailedProductId(
    await QUERY`
    SELECT detailed_product_id FROM carts WHERE user_id=${user_id}`
  );

  if (filtered_detailed_product_ids.length === 0) {
    console.log("해당 user id에 상품이 없음");
    return false;
  } else {
    console.log("해당 user id에 상품이 있음");
    filtered_detailed_product_ids = getDetailedProductId(
      await ASSOCIATE`
      detailed_products ${{
        query: SQL`WHERE ${IN(
          "id",
          filtered_detailed_product_ids
        )} AND product_id = ${product_id}`,
        column: CL("id as detailed_product_id"),
      }}
    `
    );

    if (filtered_detailed_product_ids.length === 0) {
      console.log("해당 product 가 존재하지 않음");
      return false;
    } else {
      console.log("해당 product 가 존재함");
      const filtered_detailed_products_option_properties_data: DetailedProductsOptionPropertiesIdsData =
        await QUERY`
        SELECT * from detailed_products_option_properties WHERE ${IN(
          "detailed_product_id",
          filtered_detailed_product_ids
        )}
       `;

      const filtered_option_property_ids = pipe(
        filtered_detailed_products_option_properties_data,
        groupBy((data) => data.detailed_product_id),
        (data) => Object.values(data),
        map((data) => data.map(({ option_property_id }) => option_property_id)),
        toArray
      );

      filtered_detailed_product_ids = getDetailedProductId(
        filtered_detailed_products_option_properties_data
      );

      let temp = 0;
      for (const id of filtered_option_property_ids) {
        if (JSON.stringify(id) === JSON.stringify(option_property_ids)) {
          console.log("해당 옵션을 갖고 있는 상품이 존재함");
          return filtered_detailed_product_ids[temp];
        }
        temp++;
      }
    }
  }
  console.log("해당 옵션을 갖고 있는 상품이 존재하지 않음");
  return false;
};

router.get("/:product_id", async function (req, res, next) {
  try {
    const product_id: number = +req.params.product_id;
    const products_data: ProductsDetailData = await ASSOCIATE`
      products ${{
        query: SQL`WHERE id = ${product_id}`,
        column: CL("id", "name", "price"),
      }}
        - small_category ${{
          column: CL("id", "name"),
        }}
          - big_category
        < products_tags
          - tag
        < products_options
          - options
            < option_properties
    `;
    const product_data = products_data[0];
    const product: GetDetail = {
      product: {
        id: product_data.id,
        name: product_data.name,
        price: product_data.price,
      },
      small_category: {
        id: product_data._.small_category.id,
        name: product_data._.small_category.name,
      },
      big_category: {
        id: product_data._.small_category._.big_category.id,
        name: product_data._.small_category._.big_category.name,
      },
      tags: pipe(
        product_data._.products_tags,
        map((product_tag) => product_tag._.tag),
        toArray
      ),
      options: pipe(
        product_data._.products_options,
        map((product_option) => ({
          id: product_option._.options.id,
          name: product_option._.options.name,
          option_properties: pipe(
            product_option._.options._.option_properties,
            map((option_property) => ({
              id: option_property.id,
              name: option_property.name,
              additional_price: option_property.additional_price,
              base: option_property.base,
              option_id: option_property.option_id,
            })),
            toArray
          ),
        })),
        toArray
      ),
    };
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/addToCart", async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const { user_id, product_id, option_property_ids, product_amount } =
      req.body;
    const inCart = await isAlreadyInCart({
      user_id,
      product_id,
      option_property_ids,
    });
    if (inCart) {
      await QUERY`UPDATE carts SET product_amount = product_amount + ${product_amount} WHERE detailed_product_id = ${inCart}`;
      console.log("이미 카트에 있는 상품임! 번호는 " + inCart);
      await COMMIT();
    } else {
      await QUERY`INSERT INTO detailed_products (product_id) VALUES (${product_id})`;
      const detailed_product_ids =
        await QUERY`SELECT id FROM detailed_products WHERE product_id = ${product_id} ORDER BY id DESC`;
      await each(async (option_property_id) => {
        await QUERY`INSERT INTO detailed_products_option_properties (detailed_product_id, option_property_id) 
      VALUES (${detailed_product_ids[0].id}, ${option_property_id})`;
      }, toAsync(option_property_ids));
      await QUERY`INSERT INTO carts (user_id, detailed_product_id, product_amount) 
    VALUES (${String(user_id)}, ${
        detailed_product_ids[0].id
      }, ${product_amount})`;
      await COMMIT();
    }
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export { router };
