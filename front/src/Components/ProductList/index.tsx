import React from 'react';
import styled from 'styled-components';
import { map, pipe, toArray } from '@fxts/core';
import { GetProductsType } from '../../../../models/data.interface';
import { Product } from '../index';

export interface ProductListProps {
  products_data: GetProductsType;
}

export const ProductList = ({ products_data }: ProductListProps) => (
  <ProductListWrap>
    {pipe(
      products_data.products,
      map((product) => <Product key={product.id} product={product} />),
      toArray,
    )}
  </ProductListWrap>
);

const ProductListWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 1rem;
  margin-right: -4rem;
`;
