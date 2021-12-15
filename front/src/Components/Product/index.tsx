import React from 'react';
import styled from 'styled-components';
import { pipe, map, toArray } from '@fxts/core';
import { GetProductType } from '../../../../models/data.interface';
import { Tag } from '../Tag';

export const Product = ({ product }: { product: GetProductType }) => (
  <ProductWrap>
    <a className="product-container" href={`/detail?product_id=${product.id}`}>
      <div className="tags-container">
        {pipe(
          product.tags,
          map((tag) => <Tag key={tag.id} tag={tag} />),
          toArray,
        )}
      </div>
      <div className="name">{product.name}</div>
    </a>
  </ProductWrap>
);

const ProductWrap = styled.div`
  .product-container {
    width: 12rem;
    height: 14rem;
    background-color: #e9ecef;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    flex-flow: column;
    margin-right: 2rem;
    margin-bottom: 2rem;
  }
  .tags-container {
    display: flex;
    margin-bottom: 0.4rem;
  }
`;
