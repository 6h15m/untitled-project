import { map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { TagType } from '../../../../models/data.interface';
import * as S from './style';

export interface TagFormProps {
  tags_data: Array<TagType>;
}

export const TagForm = ({ tags_data }: TagFormProps) => {
  return (
    <S.TagForm>
      {pipe(
        tags_data,
        map((tag) => (
          <S.Tag key={tag.id}>
            <input type="checkbox" id={`tag-${tag.id}`} value={tag.id} />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </S.Tag>
        )),
        toArray,
      )}
      <S.AddTagBtn>+</S.AddTagBtn>
    </S.TagForm>
  );
};
