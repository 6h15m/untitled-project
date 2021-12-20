import { filter, map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { GetCategoriesType } from '../../../../models/data.interface';
import * as S from './style';

export interface CategoryListFormProps {
  categories_data: GetCategoriesType;
}

export const CategoryListForm = ({ categories_data }: CategoryListFormProps) => {
  return (
    <S.CategorySelectorBox>
      <S.CategorySelector>
        {pipe(
          categories_data.big_categories,
          map((b) => (
            <option id="big-category-option" value={b.id} key={b.id}>
              {b.name}
            </option>
          )),
          toArray,
        )}
      </S.CategorySelector>
      <S.CategoryArrow>{`>`}</S.CategoryArrow>
      <S.CategorySelector>
        {pipe(
          categories_data.small_categories,
          filter((s) => s.big_category_id === categories_data.big_categories[0].id),
          map((s) => (
            <option id={`${s.id}`} key={s.id}>
              {s.name}
            </option>
          )),
          toArray,
        )}
      </S.CategorySelector>
    </S.CategorySelectorBox>
  );
};
