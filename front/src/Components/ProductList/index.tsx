import { map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { GetProductsType } from '../../../../models/data.interface';
import { Product } from '../index';
import * as S from './style';

export interface ProductListProps {
  products_data: GetProductsType;
}

export const ProductList = ({ products_data }: ProductListProps) => (
  <S.ProductList>
    {pipe(
      products_data.products,
      map((product) => <Product key={product.id} product={product} />),
      toArray,
    )}
  </S.ProductList>
);
