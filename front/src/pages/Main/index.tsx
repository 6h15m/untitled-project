import React from 'react';
import useSWR from 'swr';
import {
  CategoryList as CategoryListType,
  GetProducts as GetProductsType,
} from '../../../../models/model.interface';
import { fetcher } from '../../@utils';
import { GetParams } from '../../hooks';
import { CategoryList, Header, ProductList } from '../../components';

export interface MainPageProps {}

export const MainPage = ({}: MainPageProps) => {
  const selected_small_category_id = parseInt(GetParams('small_category_id'));
  const selected_big_category_id = parseInt(GetParams('big_category_id'));

  const { data: products_data } = useSWR<GetProductsType>(
    selected_small_category_id
      ? `/api/products/small_category/${selected_small_category_id}`
      : selected_big_category_id
      ? `/api/products/big_category/${selected_big_category_id}` //아니 근데 일케 보내면 걍 똑같은거 아니애??ㅋㅋㅋㅋㅋ
      : '/api/products',
    fetcher,
  );
  const { data: categories_data } = useSWR<CategoryListType>('/api/categories', fetcher);

  return (
    <>
      <Header />
      {categories_data && (
        <CategoryList categories_data={categories_data} selected_big_category_id={selected_big_category_id} />
      )}
      {products_data && <ProductList products_data={products_data} />}
    </>
  );
};
