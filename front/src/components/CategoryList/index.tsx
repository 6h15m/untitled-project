import { filter, map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { GetCategoriesType } from '../../../../models/data.interface';
import * as S from './style';

export interface CategoryListProps {
  categories_data: GetCategoriesType;
  selected_big_category_id?: number;
}

export const CategoryList = ({ categories_data, selected_big_category_id }: CategoryListProps) => {
  return (
    <S.CategoryList>
      <S.CategoriesBox>
        <S.BigCategory href="/">All</S.BigCategory>
        {pipe(
          categories_data.big_categories,
          map((big_category) => (
            <S.BigCategory key={big_category.id} href={`?big_category_id=${big_category.id}`}>
              {big_category.name}
            </S.BigCategory>
          )),
          toArray,
        )}
      </S.CategoriesBox>
      <S.CategoriesBox>
        {pipe(
          categories_data.small_categories,
          filter((small_category) =>
            selected_big_category_id ? small_category.big_category_id === selected_big_category_id : true,
          ),
          map((small_category) => (
            <S.SmallCategory key={small_category.id} href={`?small_category_id=${small_category.id}`}>
              {small_category.name}
            </S.SmallCategory>
          )),
          toArray,
        )}
      </S.CategoriesBox>
    </S.CategoryList>
  );
};
