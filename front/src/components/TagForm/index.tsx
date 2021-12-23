import React from 'react';
import { TagType } from '../../../../models/data.interface';
import * as S from './style';

export interface TagDataType extends TagType {
  isNew: boolean;
}

export type changeSelectedTagType = (tag_data: TagDataType, isChecked: boolean) => void;

export interface TagFormProps {
  tag_data: TagDataType;
  changeSelectedTag: changeSelectedTagType;
}

export const TagForm = ({ tag_data, changeSelectedTag }: TagFormProps) => {
  return (
    <S.TagForm key={tag_data.id}>
      <S.TagCheck
        type="checkbox"
        id={`tag-${tag_data.id}`}
        onClick={(event) => changeSelectedTag(tag_data, event.currentTarget.checked)}
      />
      <S.TagLabel htmlFor={`tag-${tag_data.id}`}>{tag_data.name}</S.TagLabel>
    </S.TagForm>
  );
};
