import React, { useState } from 'react';
import { TagType } from '../../../../models/data.interface';
import { TagForm } from '../TagForm';
import * as S from './style';

type TagListType = Array<TagType>;

export interface TagListFormProps {
  tags_data: TagListType;
}

export const TagListForm = ({ tags_data }: TagListFormProps) => {
  const [lastTagId, setLastTagId] = useState(tags_data[tags_data.length - 1].id);
  const [tagList, setTagList] = useState<TagListType>(tags_data);
  const [newTagName, setNewTagName] = useState<string>('');

  const addTag = () => {
    if (newTagName) {
      setTagList([...tagList, { id: lastTagId + 1, name: newTagName }]);
      setLastTagId(lastTagId + 1);
      setNewTagName('');
    }
  };

  return (
    <S.TagListForm>
      {tagList.map((tag_data, index) => (
        <TagForm key={`tag-${index}`} tag_data={tag_data} />
      ))}
      <S.AddTagInput
        placeholder="Insert new tag name 😲"
        maxLength={25}
        value={newTagName}
        onChange={(event) => setNewTagName(event.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            addTag();
            e.preventDefault();
          }
        }}
      />
      <S.AddTagBtn onClick={addTag}>+</S.AddTagBtn>
    </S.TagListForm>
  );
};
