import React, { useCallback, useState } from 'react';
import { CategoryList as CategoryListType, Tag as TagType } from '../../../../models/model.interface';
import { CategoryListForm, OptionForm, TagListForm } from '../index';
import { OptionDataType } from '../OptionForm';
import { changeTagsDataType } from '../TagListForm';
import * as S from './style';

type OptionDataListType = Array<OptionDataType>;
export type changeCategoryDataType = (selected_small_category_id: number) => void;
export type changeOptionDataType = (option_number: number, changed_option_data: OptionDataType) => void;

interface PostCreateType {
  product_name: string;
  product_price: number;
  small_category_id: number;
  tags: Array<TagType>;
  options: OptionDataListType;
}

export interface CreateProps {
  categories_data: CategoryListType;
  tags_data: Array<TagType>;
}

export const Create = ({ categories_data, tags_data }: CreateProps) => {
  const [createData, setCreateData] = useState<PostCreateType>({
    product_name: '',
    product_price: 0,
    small_category_id: categories_data.small_categories[0].id,
    tags: [],
    options: [],
  });

  const changeCategoryData: changeCategoryDataType = useCallback((selected_small_category_id) => {
    setCreateData((prevState) => ({ ...prevState, small_category_id: selected_small_category_id }));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCreateData({ ...createData, [event.target.name]: event.target.value });
  };

  const [optionDataList, setOptionDataList] = useState<OptionDataListType>([
    {
      name: '',
      option_property_data_list: [],
    },
  ]);

  const addOption = () => {
    setOptionDataList([
      ...optionDataList,
      {
        name: '',
        option_property_data_list: [],
      },
    ]);
  };

  const changeOptionData: changeOptionDataType = useCallback(
    (option_number, changed_option_data) => {
      optionDataList[option_number] = changed_option_data;
      setCreateData((prevState) => ({ ...prevState, options: optionDataList }));
    },
    [optionDataList],
  );

  const changeTagsData: changeTagsDataType = useCallback((changed_tags_data) => {
    setCreateData((prevState) => ({
      ...prevState,
      tags: changed_tags_data.map((data) => ({ id: data.id, name: data.isNew ? data.name : '' })),
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(createData);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <S.Create>
      <h2>Create New Product</h2>
      <S.CreateForm onSubmit={handleSubmit}>
        <S.FormBox>
          <h3>Categories</h3>
          <CategoryListForm categories_data={categories_data} changeCategoryData={changeCategoryData} />
        </S.FormBox>
        <S.FormBox>
          <h3>Product Name</h3>
          <input type="text" name="product_name" onChange={handleInputChange} required />
        </S.FormBox>
        <S.FormBox>
          <h3>Product Price</h3>
          <input type="number" placeholder="0" name="product_price" onChange={handleInputChange} required />
        </S.FormBox>
        <S.FormBox>
          <h3>Tags</h3>
          <TagListForm tags_data={tags_data} changeTagsData={changeTagsData} />
        </S.FormBox>
        <S.FormBox>
          <h3>Options</h3>
          <S.OptionsBox>
            {optionDataList.map((option_data, index) => (
              <OptionForm
                key={`option-form-${index}`}
                option_number={index}
                name={option_data.name}
                option_property_data_list={option_data.option_property_data_list}
                changeOptionData={changeOptionData}
              />
            ))}
          </S.OptionsBox>
          <S.AddOptionBtn type="button" onClick={addOption}>
            +
          </S.AddOptionBtn>
        </S.FormBox>
        <S.CreateBtn type="submit" value="Create" />
      </S.CreateForm>
    </S.Create>
  );
};
