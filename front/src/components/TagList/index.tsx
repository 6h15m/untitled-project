import { map, pipe, toArray } from '@fxts/core';
import React from 'react';
import { Tag as TagType } from '../../../../models/model.interface';
import { Tag } from '../Tag';
import * as S from './style';

export interface TagListProps {
  tags_data: Array<TagType>;
}

export const TagList = ({ tags_data }: TagListProps) => (
  <S.TagList>
    {pipe(
      tags_data,
      map((tag) => <Tag key={tag.id} tag={tag} />),
      toArray,
    )}
  </S.TagList>
);
