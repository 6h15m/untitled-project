import { map, pipe, toArray } from '@fxts/core';
import React, { useState } from 'react';
import { TagType } from '../../../../models/data.interface';
import { TagForm } from '../TagForm';
import * as S from './style';

export interface TagListFormProps {
  tags_data: Array<TagType>;
}

export const TagListForm = ({ tags_data }: TagListFormProps) => {
  const [lastTagId, setLastTagId] = useState(tags_data[tags_data.length - 1].id);
  const [tagList, setTagList] = useState(
    pipe(
      tags_data,
      map((tag_data) => <TagForm tag_data={tag_data} key={tag_data.id} />),
      toArray,
    ),
  );

  const addTag = () => {
    let tag_name = prompt("What's your new tag name? 😲");
    if (tag_name) {
      setTagList(
        tagList.concat(<TagForm tag_data={{ id: lastTagId + 1, name: tag_name }} key={lastTagId + 1} />),
      );
      setLastTagId(lastTagId + 1);
    }
  };

  return (
    <S.TagListForm>
      {tagList}
      <S.AddTagBtn onClick={addTag}>+</S.AddTagBtn>
    </S.TagListForm>
  );
};
