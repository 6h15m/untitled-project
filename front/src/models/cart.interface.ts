import { ProductType } from './product.interface';
import { OptionPropertyType } from './detail.interface';

export interface UserType {
  user_id: string;
  user_password: string;
  user_role: string;
}

export interface CartType {
  user_id: string;
  detailed_product_id: number;
  cart_product_amount: number;
}

export interface DetailedProductType {
  detailed_product_id: number;
  product_id: number;
}

export interface DetailedProductOptionPropertyType {
  detailed_product_id: number;
  option_property_id: number;
}

export interface CartsType {
  user_id: string;
  cart: Array<CartType>;
  detailed_products: Array<DetailedProductType>;
  option_properties: Array<OptionPropertyType>;
  detailed_products_option_properties: Array<DetailedProductOptionPropertyType>;
  products: Array<ProductType>;
}
