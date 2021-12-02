export interface BigCategoryType {
  big_category_id: number;
  big_category_name: string;
}

export interface SmallCategoryType {
  small_category_id: number;
  small_category_name: string;
  big_category_id: number;
}

export interface CategoryType {
  big_categories: Array<BigCategoryType>;
  small_categories: Array<SmallCategoryType>;
}
