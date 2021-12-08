import express from 'express';
const router = express.Router();
import POOL from '../database/connect.js';
import { each, groupBy, map, pipe, toArray, toAsync } from '@fxts/core';
import { DetailedProductsOptionPropertyType } from '../../models/data.interface';
const { SQL, ASSOCIATE, CL, IN } = POOL;

function* entriesToArray(obj: { [p: number]: DetailedProductsOptionPropertyType[] }) {
  for (const k in obj) yield obj[k];
}

const getDetailedProductId = (datas: any) =>
  pipe(
    datas,
    map((data: any) => data.detailed_product_id),
    toArray,
  ) as Array<number>;

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
    await ASSOCIATE`
    carts ${{
      query: SQL`WHERE user_id = ${user_id}`,
      column: CL('detailed_product_id'),
    }}
  `,
  );
  if (filtered_detailed_product_ids.length === 0) {
    console.log('해당 user id에 상품이 없음');
    return false;
  } else {
    console.log('해당 user id에 상품이 있음');
    filtered_detailed_product_ids = getDetailedProductId(
      await ASSOCIATE`
      detailed_products ${{
        query: SQL`WHERE ${IN('id', filtered_detailed_product_ids)} AND product_id = ${product_id}`,
        column: CL('id as detailed_product_id'),
      }}
    `,
    );
    if (filtered_detailed_product_ids.length === 0) {
      console.log('해당 product가 존재하지 않음');
      return false;
    } else {
      console.log('해당 product가 존재함');
      const filtered_detailed_products_option_properties_data = (await ASSOCIATE`
        detailed_products_option_properties ${{
          query: SQL`WHERE ${IN('detailed_product_id', filtered_detailed_product_ids)}`,
        }}
      `) as Array<DetailedProductsOptionPropertyType>;
      console.log(filtered_detailed_products_option_properties_data);
      const filtered_option_property_ids = pipe(
        filtered_detailed_products_option_properties_data,
        groupBy((data) => data.detailed_product_id),
        (a) => entriesToArray(a),
        map((a) =>
          pipe(
            a,
            map(({ detailed_product_id, option_property_id }) => option_property_id),
            toArray,
          ),
        ),
        toArray,
      );
      console.log(filtered_option_property_ids);
      filtered_detailed_product_ids = getDetailedProductId(filtered_detailed_products_option_properties_data);
      // TODO: temp 삭제
      let temp = 0;
      for (const id of filtered_option_property_ids) {
        temp++;
        if (JSON.stringify(id) === JSON.stringify(option_property_ids)) {
          console.log('해당 옵션을 갖고 있는 상품이 존재함');
          return filtered_detailed_product_ids[temp];
        }
      }
    }
  }
  console.log('해당 옵션을 갖고 있는 상품이 존재하지 않음');
  return false;
};

router.get('/:product_id', async function (req, res, next) {
  try {
    const product_id: number = +req.params.product_id;
    const product_data = await ASSOCIATE`
      products ${{
        query: SQL`WHERE id = ${product_id}`,
        column: CL('id', 'name', 'price'),
      }}
        - small_category ${{
          column: CL('id', 'name'),
        }}
          - big_category
        < products_tags
          - tags
        < products_options
          - options
            < option_properties
    `;
    res.json({
      product: { id: product_data[0].id, name: product_data[0].name, price: product_data[0].price },
      small_category: product_data[0]._.small_category,
      big_category: {
        id: product_data[0]._.small_category._.big_category.id,
        name: product_data[0]._.small_category._.big_category.name,
      },
      tags: pipe(
        product_data[0]._.products_tags,
        map((product_tag: any) => product_tag._.tags),
        toArray,
      ),
      options: pipe(
        product_data[0]._.products_options,
        map((product_option: any) => ({
          id: product_option._.options.id,
          name: product_option._.options.name,
          option_properties: pipe(
            product_option._.options._.option_properties,
            map((option_property: any) => ({
              id: option_property.id,
              name: option_property.name,
              additional_price: option_property.additional_price,
              base: option_property.base,
            })),
            toArray,
          ),
        })),
        toArray,
      ),
    });
  } catch (error) {
    next(error);
  }
});

router.post('/addToCart', async function (req, res, next) {
  const { TRANSACTION } = POOL;
  const { QUERY, COMMIT, ROLLBACK } = await TRANSACTION();
  try {
    const { user_id, product_id, option_property_ids, product_amount } = req.body;
    const inCart = await isAlreadyInCart({ user_id, product_id, option_property_ids });
    if (inCart) {
      await QUERY`UPDATE carts SET product_amount = product_amount + ${product_amount} WHERE detailed_product_id = ${inCart}`;
      console.log('이미 카트에 있는 상품임! 번호는 ' + inCart);
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
    VALUES (${String(user_id)}, ${detailed_product_ids[0].id}, ${product_amount})`;
      await COMMIT();
    }
    res.json({});
  } catch (error) {
    await ROLLBACK();
    next(error);
  }
});

export default router;
