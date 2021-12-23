import React from 'react';
import { Link } from 'react-router-dom';
import { GetDetailType } from '../../../../models/model.interface';
import { TagList } from '../TagList';
import * as S from './style';

export interface DefaultInfoProps {
  detail_data: GetDetailType;
}

export const DefaultInfo = ({ detail_data }: DefaultInfoProps) => (
  <S.DefaultInfo>
    <S.ProductCategoryBox>
      <Link to={`/?big_category_id=${detail_data.big_category.id}`}>{detail_data.big_category.name}</Link>
      <S.ProductCategoryArrowText>{`>`}</S.ProductCategoryArrowText>
      <Link to={`/?small_category_id=${detail_data.small_category.id}`}>
        {detail_data.small_category.name}
      </Link>
    </S.ProductCategoryBox>
    <S.ProductNameText>{detail_data.product.name}</S.ProductNameText>
    <TagList tags_data={detail_data.tags} />
  </S.DefaultInfo>
);
