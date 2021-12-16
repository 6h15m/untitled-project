import React from 'react';
import styled from 'styled-components';
import { pipe, map, toArray } from '@fxts/core';
import { GetDetailType } from '../../../../models/data.interface';
import { Tag } from '../Tag';

export interface DefaultInfoProps {
  detail_data: GetDetailType;
}

export const DefaultInfo = ({ detail_data }: DefaultInfoProps) => (
  <DefaultInfoWrap>
    <div className="product-category-container">
      <a
        className="product-big-category"
        href={`http://localhost:3000/?big_category_id=${detail_data.big_category.id}`}
      >
        {detail_data.big_category.name}
      </a>
      <div className="product-category-arrow">{`>`}</div>
      <a
        className="product-small-category"
        href={`http://localhost:3000/?small_category_id=${detail_data.small_category.id}`}
      >
        {detail_data.small_category.name}
      </a>
    </div>
    <div className="product-name">{detail_data.product.name}</div>
    {pipe(
      detail_data.tags,
      map((tag) => <Tag key={tag.id} tag={tag} />),
      toArray,
    )}
  </DefaultInfoWrap>
);

const DefaultInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  .product-category-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  .product-category-arrow {
    margin: 0 0.3rem;
  }
  .product-name {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }
  .product-tags-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;
