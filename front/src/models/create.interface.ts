import { BigCategoryType, SmallCategoryType } from './category.interface';
import { TagType } from './detail.interface';

export interface CreateType {
  big_categories: Array<BigCategoryType>;
  small_categories: Array<SmallCategoryType>;
  tags: Array<TagType>;
}