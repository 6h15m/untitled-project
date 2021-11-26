import { SmallCategoryType, BigCategoryType } from './category.interface';
import { ProductType } from './product.interface';

export interface TagType {
  tag_id: number;
  tag_name: string;
}

export interface OptionType {
  option_id: number;
  option_name: string;
}

export interface OptionPropertyType {
  option_property_id: number;
  option_property_name: string;
  option_property_additional_price: number;
  option_property_base: number;
  option_id: number;
}

export interface DetailType {
  product: ProductType;
  small_category: SmallCategoryType;
  big_category: BigCategoryType;
  tags: Array<TagType>;
  options: Array<OptionType>;
  option_properties_all: Array<OptionPropertyType>;
}
