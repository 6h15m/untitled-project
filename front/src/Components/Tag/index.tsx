import React from 'react';
import * as S from './style';
import { TagType } from '../../../../models/data.interface';

export interface TagProps {
  tag: TagType;
}

export const Tag = ({ tag: tag }: TagProps) => <S.Tag># {tag.name}</S.Tag>;
