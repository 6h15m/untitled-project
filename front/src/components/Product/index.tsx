import React from 'react';
import { GetProduct as GetProductType } from '../../../../models/model.interface';
import { TagList } from '../TagList';
import * as S from './style';

export interface ProductProps {
  product: GetProductType;
}

export const Product = ({ product }: ProductProps) => (
  <S.Product to={`/detail?product_id=${product.id}`}>
    <TagList tags_data={product.tags} />
    <S.ProductNameText>{product.name}</S.ProductNameText>
  </S.Product>
);
