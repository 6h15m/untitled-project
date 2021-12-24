import React from 'react';
import * as S from './style';
import { Tag as TagType } from '../../../../models/model.interface';

export interface TagProps {
  tag: TagType;
}

export const Tag = ({ tag: { name } }: TagProps) => <S.Tag># {name}</S.Tag>;
