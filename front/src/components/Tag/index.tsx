import React from 'react';
import * as S from './style';
import { TagType } from '../../../../models/model.interface';

export interface TagProps {
  tag: TagType;
}

export const Tag = ({ tag: { name } }: TagProps) => <S.Tag># {name}</S.Tag>;
