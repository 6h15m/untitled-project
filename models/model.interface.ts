export interface BigCategoryType {
  id: number;
  name: string;
}

export interface SmallCategoryType {
  id: number;
  name: string;
  big_category_id?: number;
}

export interface CategoryListType {
  small_categories: Array<SmallCategoryType>;
  big_categories: Array<BigCategoryType>;
}

export interface ProductType {
  id: number;
  name: string;
  price: number;
  small_category_id?: number;
}

export interface TagType {
  id: number;
  name: string;
}

export interface OptionType {
  id: number;
  name: string;
  option_properties: Array<OptionPropertyType>;
}

export interface OptionDetailType extends OptionType {
  option_properties: Array<OptionPropertyDetailType>;
}

export interface OptionPropertyType {
  id: number;
  name: string;
  additional_price: number;
  base: boolean;
}

export interface OptionPropertyDetailType extends OptionPropertyType {
  option_id: number;
}

export interface PostOptionType {
  name: string;
  option_properties: Array<PostOptionPropertyType>;
}

export interface PostOptionPropertyType {
  name: string;
  additional_price: number;
  base: boolean;
  option_property_number: number;
}

export interface DetailedProductType {
  product_id?: number;
  id: number;
  name: string;
  price: number;
  option_properties: Array<OptionPropertyType>;
}

export interface DetailedProductsOptionPropertyType {
  detailed_product_id: number;
  option_property_id: number;
}

export interface CartType {
  product_amount: number;
  detailed_product: DetailedProductType;
}

export interface GetProductType {
  id: number;
  name: string;
  price: number;
  small_category_id: number;
  tags: Array<TagType>;
}

export interface GetProductsType {
  products: Array<GetProductType>;
}

export interface GetCreateType {
  categories: CategoryListType;
  tags: Array<TagType>;
}

export interface PostCreateType {
  small_category_id: number;
  product_name: string;
  product_price: number;
  tags: Array<TagType>;
  options: Array<PostOptionType>;
}

export interface GetDetailType {
  product: ProductType;
  small_category: SmallCategoryType;
  big_category: BigCategoryType;
  tags: Array<TagType>;
  options: Array<OptionDetailType>;
}

export interface GetCartsType {
  user_id: string;
  carts: Array<CartType>;
}

export interface TagDataType extends TagType {
  isNew: boolean;
}
