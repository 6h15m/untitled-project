import React from 'react';
import { TagType } from '../../../../models/data.interface';
import * as S from './style';

export interface TagFormProps {
  tag_data: TagType;
}

export const TagForm = ({ tag_data }: TagFormProps) => {
  return (
    <S.TagForm key={tag_data.id}>
      <S.TagCheck type="checkbox" id={`tag-${tag_data.id}`} value={tag_data.id} />
      <S.TagLabel htmlFor={`tag-${tag_data.id}`}>{tag_data.name}</S.TagLabel>
    </S.TagForm>
  );
};
