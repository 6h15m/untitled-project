export interface BigCategory {
  id: number;
  name: string;
}

export interface SmallCategory {
  id: number;
  name: string;
  big_category_id?: number;
}

export interface CategoryList {
  small_categories: Array<SmallCategory>;
  big_categories: Array<BigCategory>;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductDetail extends Product {
  small_category_id: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Option {
  id: number;
  name: string;
  option_properties: Array<OptionProperty>;
}

export interface OptionDetail extends Option {
  option_properties: Array<OptionPropertyDetail>;
}

export interface GetOptionProperty {
  id: number;
  name: string;
  additional_price: number;
}

export interface OptionProperty {
  id: number;
  name: string;
  additional_price: number;
  base: boolean;
}

export interface OptionPropertyDetail extends OptionProperty {
  option_id: number;
}

export interface PostOption {
  name: string;
  option_properties: Array<PostOptionProperty>;
}

export interface PostOptionProperty {
  name: string;
  additional_price: number;
  base: boolean;
  option_property_number: number;
}
export interface GetDetailedProduct {
  product_id: number;
  id: number;
  name: string;
  price: number;
  option_properties: Array<GetOptionProperty>;
}

export interface DetailedProduct {
  product_id?: number;
  id: number;
  name: string;
  price: number;
  option_properties: Array<OptionProperty>;
}

export interface GetCard {
  product_amount: number;
  detailed_product: GetDetailedProduct;
}

export interface Card {
  product_amount: number;
  detailed_product: DetailedProduct;
}

export interface GetProduct extends ProductDetail {
  tags: Array<Tag>;
}

export interface GetProducts {
  products: Array<GetProduct>;
}

export interface GetCreate {
  categories: CategoryList;
  tags: Array<Tag>;
}

export interface PostCreate {
  small_category_id: number;
  product_name: string;
  product_price: number;
  tags: Array<Tag>;
  options: Array<PostOption>;
}

export interface GetDetail {
  product: Product;
  small_category: SmallCategory;
  big_category: BigCategory;
  tags: Array<Tag>;
  options: Array<OptionDetail>;
}

export interface GetCart {
  user_id: string;
  cart: Array<GetCard>;
}

export interface TagData extends Tag {
  isNew: boolean;
}
