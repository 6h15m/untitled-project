import React from 'react';
import { GetCategoriesType, TagType } from '../../../../models/data.interface';
import { CategoryListForm, OptionForm, TagForm } from '../index';
import * as S from './style';

export interface CreateProps {
  categories_data: GetCategoriesType;
  tags_data: Array<TagType>;
}

export const Create = ({ categories_data, tags_data }: CreateProps) => {
  return (
    <S.Create>
      <h2>Create New Product</h2>
      <S.CreateForm>
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
          <TagForm tags_data={tags_data} />
        </S.FormBox>
        <S.FormBox>
          <h3>Options</h3>
          <S.OptionsBox>
            <OptionForm />
          </S.OptionsBox>
          <S.AddOptionBtn>+</S.AddOptionBtn>
        </S.FormBox>
        <S.CreateBtn type="submit" value="Create" />
      </S.CreateForm>
    </S.Create>
  );
};
