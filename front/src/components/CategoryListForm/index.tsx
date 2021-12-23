import { filter, map, pipe, toArray } from '@fxts/core';
import React, { useEffect, useState } from 'react';
import { CategoryListType } from '../../../../models/model.interface';
import * as S from './style';

export type changeCategoryDataType = (selected_small_category_id: number) => void;

export interface CategoryListFormProps {
  categories_data: CategoryListType;
  changeCategoryData: changeCategoryDataType;
}

export const CategoryListForm = ({ categories_data, changeCategoryData }: CategoryListFormProps) => {
  const [selectedBigCategoryId, setSelectedBigCategoryId] = useState(categories_data.big_categories[0].id);
  const [selectedSmallCategoryId, setSelectedSmallCategoryId] = useState(
    categories_data.small_categories[0].id,
  );

  const changeBigCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBigCategoryId(+e.currentTarget.value);
  };

  const changeSmallCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSmallCategoryId(+e.currentTarget.value);
  };

  useEffect(() => {
    changeCategoryData(selectedSmallCategoryId);
  }, [selectedSmallCategoryId, changeCategoryData]);

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
      <S.CategorySelector onChange={changeSmallCategory}>
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
