import React from 'react';
import styled from 'styled-components';
import { pipe, map, toArray, filter } from '@fxts/core';
import { GetCategoriesType } from '../../../../models/data.interface';

export interface CategoryListProps {
  categories_data: GetCategoriesType;
  selected_big_category_id: number | null;
}
export const CategoryList = ({ categories_data, selected_big_category_id }: CategoryListProps) => {
  return (
    <CategoryListWrap>
      <div className="big-categories-container">
        <BigCategory href="/">All</BigCategory>
        {pipe(
          categories_data.big_categories,
          map((big_category) => (
            <BigCategory key={big_category.id} href={`?big_category_id=${big_category.id}`}>
              {big_category.name}
            </BigCategory>
          )),
          toArray,
        )}
      </div>
      <div className="small-categories-container">
        {pipe(
          categories_data.small_categories,
          filter((small_category) =>
            selected_big_category_id ? small_category.big_category_id === selected_big_category_id : true,
          ),
          map((small_category) => (
            <SmallCategory
              key={small_category.id}
              className="small-category"
              href={`?small_category_id=${small_category.id}`}
            >
              {small_category.name}
            </SmallCategory>
          )),
          toArray,
        )}
      </div>
    </CategoryListWrap>
  );
};

const BigCategory = styled.a`
  margin-right: 0.8rem;
  font-size: 1.4em;
`;

const SmallCategory = styled.a`
  margin-right: 0.8rem;
`;

const CategoryListWrap = styled.div`
  .big-categories-container {
    display: flex;
    flex-flow: row wrap;
    flex-direction: row;
  }

  .small-categories-container {
    display: flex;
    flex-flow: row wrap;
    flex-direction: row;
    margin-top: 0.8rem;
  }
`;
