import {
  BigCategory,
  OptionPropertyDetail,
  ProductDetail,
  Tag,
} from "../../models/model.interface";

interface ProductTagData {
  product_id: number;
  tag_id: number;
  _: { tag: Tag };
}

type ProductsTagsData = ProductTagData[];

interface ProductData {
  id: number;
  name: string;
  price: number;
  small_category_id: number;
  _: {
    products_tags: ProductsTagsData;
  };
}

interface ProductDetailData {
  id: number;
  name: string;
  price: number;
  small_category_id: number;
  _: {
    small_category: {
      id: number;
      name: string;
      big_category_id: number;
      _: { big_category: BigCategory };
    };
    products_options: {
      product_id: number;
      option_id: number;
      _: {
        options: {
          id: number;
          name: string;
          _: {
            option_properties: OptionPropertyDetail[];
          };
        };
      };
    }[];
    products_tags: ProductsTagsData;
  };
}

interface DetailedProductIdData {
  detailed_product_id: number;
}

interface DetailedProductOptionPropertyIdData {
  detailed_product_id: number;
  option_property_id: number;
}

interface CartData {
  detailed_product_id: number;
  product_amount: number;
  _: {
    detailed_product: {
      id: number;
      product_id: number;
      _: {
        product: ProductDetail;
        detailed_products_option_properties: {
          detailed_product_id: number;
          option_property_id: number;
          _: {
            option_property: OptionPropertyDetail;
          };
        }[];
      };
    };
  };
}

interface BigCategoryProductData {
  id: number;
  _: {
    products: {
      id: number;
      name: string;
      price: number;
      small_category_id: number;
      _: {
        products_tags: ProductsTagsData;
      };
    }[];
  };
}

interface QProductTagData extends Tag {
  _: { products_tags: ProductsTagsData };
}

export type ProductsDetailData = ProductDetailData[];
export type DetailedProductIdsData = DetailedProductIdData[];
export type DetailedProductsOptionPropertiesIdsData =
  DetailedProductOptionPropertyIdData[];
export type ProductsData = ProductData[];
export type CartsData = CartData[];
export type BigCategoryProductsData = BigCategoryProductData[];
export type QProductsTagsData = QProductTagData[];
