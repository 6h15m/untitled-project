import { each, filter, pipe } from '@fxts/core';
import React, { useState } from 'react';
import { GetCategoriesType, TagType } from '../../../../models/data.interface';
import { CategoryListForm, OptionForm, TagListForm } from '../index';
import * as S from './style';

export interface CreateProps {
  categories_data: GetCategoriesType;
  tags_data: Array<TagType>;
}

export const Create = ({ categories_data, tags_data }: CreateProps) => {
  const [optionNumber, setOptionNumber] = useState(0);
  const [optionList, setOptionList] = useState([
    <OptionForm option_number={optionNumber} key={`option-form-${optionNumber}`} />,
  ]);

  const addOption = () => {
    setOptionList(
      optionList.concat(
        <OptionForm option_number={optionNumber + 1} key={`option-form-${optionNumber + 1}`} />,
      ),
    );
    setOptionNumber(optionNumber + 1);
  };

  const hasNullValue = () => {
    const input_els = document.querySelectorAll('input');
    pipe(
      input_els,
      filter((el) => el.type !== 'checkbox' && el.placeholder !== 'Search'),
      each((el) => {
        if (!el.value) {
          throw 'Please fill all value! 😔';
        }
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log('submit');
    e.preventDefault();
    try {
      hasNullValue();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <S.Create>
      <h2>Create New Product</h2>
      <S.CreateForm onSubmit={handleSubmit}>
        <S.FormBox>
          <h3>Categories</h3>
          <CategoryListForm categories_data={categories_data} />
        </S.FormBox>
        <S.FormBox>
          <h3>Product Name</h3>
          <input type="text" id="product-name-field" />
        </S.FormBox>
        <S.FormBox>
          <h3>Product Price</h3>
          <input type="number" placeholder="0" id="product-price-field" />
        </S.FormBox>
        <S.FormBox>
          <h3>Tags</h3>
          <TagListForm tags_data={tags_data} />
        </S.FormBox>
        <S.FormBox>
          <h3>Options</h3>
          <S.OptionsBox>{optionList}</S.OptionsBox>
          <S.AddOptionBtn type="button" onClick={addOption}>
            +
          </S.AddOptionBtn>
        </S.FormBox>
        <S.CreateBtn type="submit" value="Create" />
      </S.CreateForm>
    </S.Create>
  );
};
