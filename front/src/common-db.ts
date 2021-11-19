import { filter, map, pipe } from "@fxts/core";
import { CARTS } from "./sample-data/carts";
import { DETAILED_PRODUCTS } from "./sample-data/detailed_products";
import { PRODUCTS } from "./sample-data/products";
import { DETAILED_PRODUCTS_OPTION_PROPERTIES } from "./sample-data/detailed_products_option_properties";
import { OPTION_PROPERTIES } from "./sample-data/option_properties";
import { SMALL_CATEGORIES } from "./sample-data/small_categories";
import { BIG_CATEGORIES } from "./sample-data/big_categories";
import { PRODUCTS_TAGS } from "./sample-data/products_tags";
import { TAGS } from "./sample-data/tags";
import { PRODUCTS_OPTIONS } from "./sample-data/products_options";
import { OPTIONS } from "./sample-data/options";

export const getCartByUserId = (user_id: string) => [
  ...pipe(
    CARTS,
    filter((c) => (c.user_id == user_id ? c : null))
  ),
];

export const getDetailedProductById = (detailed_product_id: number) =>
  DETAILED_PRODUCTS[detailed_product_id - 1];

export const getProductNameById = (product_id: number) =>
  PRODUCTS[product_id - 1].product_name;

export const getDetailedProductOptionPropertyId = (
  detailed_product_id: number
) => [
  ...pipe(
    DETAILED_PRODUCTS_OPTION_PROPERTIES,
    filter((d) => (d.detailed_product_id == detailed_product_id ? d : null)),
    map((d) => d.option_property_id)
  ),
];

export const getOptionPropertyById = (option_property_id: number) =>
  OPTION_PROPERTIES[option_property_id - 1];

export const getSmallCategoryNameById = (small_category_id: number) =>
  SMALL_CATEGORIES[small_category_id - 1].small_category_name;

export const getBigCategoryNameBySmallId = (small_category_id: number) =>
  BIG_CATEGORIES[SMALL_CATEGORIES[small_category_id - 1].big_category_id - 1]
    .big_category_name;

export const getTagIdByProductId = (product_id: number) => [
  ...pipe(
    PRODUCTS_TAGS,
    filter((p) => (p.product_id == product_id ? p : null)),
    map((p) => p.tag_id)
  ),
];

export const getTagNameById = (tag_id: number) => TAGS[tag_id - 1].tag_name;

export const getOptionIdByProductId = (product_id: number) => [
  ...pipe(
    PRODUCTS_OPTIONS,
    filter((p) => (p.product_id == product_id ? p : null))
  ),
];

export const getOptionNameByOptionId = (option_id: number) =>
  OPTIONS[option_id - 1].option_name;

export const getOptionPropertyByOptionId = (option_id: number) => [
  ...pipe(
    OPTION_PROPERTIES,
    filter((o) => (o.option_id == option_id ? o : null))
  ),
];
