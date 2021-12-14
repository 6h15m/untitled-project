import React from 'react';
import styled from 'styled-components';
import { map, pipe, toArray } from '@fxts/core';
import { GetProductsType } from '../../../../models/data.interface';
import { Product } from '../Product';

export const ProductList = ({ productsData }: { productsData: GetProductsType }) => (
  <ProductListWrap>
    {pipe(
      productsData.products,
      map((product) => <Product product={product} />),
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
