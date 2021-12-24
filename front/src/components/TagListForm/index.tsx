import { filter, pipe, toArray } from '@fxts/core';
import React, { useEffect, useState } from 'react';
import { Tag as TagType, TagData as TagDataType } from '../../../../models/model.interface';
import { TagForm } from '../TagForm';
import * as S from './style';

type TagListType = Array<TagDataType>;

export type changeTagsDataType = (changed_tags_data: TagListType) => void;

export type changeSelectedTagType = (tag_data: TagDataType, isChecked: boolean) => void;

export interface TagListFormProps {
  tags_data: Array<TagType>;
  changeTagsData: changeTagsDataType;
}

export const TagListForm = ({ tags_data, changeTagsData }: TagListFormProps) => {
  const [lastTagId, setLastTagId] = useState(tags_data[tags_data.length - 1].id);
  const [tagList, setTagList] = useState<TagListType>(
    tags_data.map((data) => ({ id: data.id, name: data.name, isNew: false })),
  );
  const [newTagName, setNewTagName] = useState<string>('');
  const [selectedTagsData, setSelectedTagsData] = useState<TagListType>([]);

  const addTag = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    if (newTagName) {
      setTagList([...tagList, { id: lastTagId + 1, name: newTagName, isNew: true }]);
      setLastTagId(lastTagId + 1);
      setNewTagName('');
    }
  };

  const changeSelectedTag: changeSelectedTagType = (tag_data, isChecked) => {
    isChecked
      ? setSelectedTagsData([
          ...selectedTagsData,
          { id: tag_data.id, name: tag_data.name, isNew: tag_data.isNew },
        ])
      : setSelectedTagsData(
          pipe(
            selectedTagsData,
            filter((data) => data.id !== tag_data.id),
            toArray,
          ),
        );
  };

  useEffect(() => {
    changeTagsData(selectedTagsData);
  }, [selectedTagsData, changeTagsData]);

  return (
    <S.TagListForm>
      {tagList.map((tag_data, index) => (
        <TagForm key={`tag-${index}`} tag_data={tag_data} changeSelectedTag={changeSelectedTag} />
      ))}
      <S.AddTagInput
        placeholder="Insert new tag name 😲"
        maxLength={25}
        value={newTagName}
        onChange={(event) => setNewTagName(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            addTag(event);
          }
        }}
      />
      <S.AddTagBtn onClick={addTag}>+</S.AddTagBtn>
    </S.TagListForm>
  );
};
