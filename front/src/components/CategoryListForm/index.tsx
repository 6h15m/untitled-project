import { filter, map, pipe, toArray } from '@fxts/core';
import React, { useState } from 'react';
import { GetCategoriesType } from '../../../../models/data.interface';
import * as S from './style';

export interface CategoryListFormProps {
  categories_data: GetCategoriesType;
}

export const CategoryListForm = ({ categories_data }: CategoryListFormProps) => {
  const [selectedBigCategoryId, setSelectedBigCategoryId] = useState(categories_data.big_categories[0].id);

  const changeBigCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBigCategoryId(+e.currentTarget.value);
  };

  return (
    <S.CategorySelectorBox>
      <S.CategorySelector onChange={changeBigCategory}>
        {pipe(
          categories_data.big_categories,
          map((b) => (
            <option value={b.id} key={b.id}>
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
          filter((s) => s.big_category_id === selectedBigCategoryId),
          map((s) => <option key={s.id}>{s.name}</option>),
          toArray,
        )}
      </S.CategorySelector>
    </S.CategorySelectorBox>
  );
};
