import React from 'react';
import useSWR from 'swr';
import { GetCategoriesType, GetProductsType } from '../../../../models/data.interface';
import fetcher from '../../@utils/fetcher';
import { Header, CategoryList, ProductList } from '../../Components';

export interface MainPageProps {}

export const MainPage = (props: MainPageProps) => {
  const selected_small_category_id = parseInt(
    new URLSearchParams(window.location.search).get('small_category_id') || '',
  );
  const selected_big_category_id = parseInt(
    new URLSearchParams(window.location.search).get('big_category_id') || '',
  );

  const { data: products_data } = useSWR<GetProductsType>(
    selected_small_category_id
      ? `/api/products/${selected_small_category_id}`
      : selected_big_category_id
      ? `/api/products/${selected_big_category_id}`
      : '/api/products',
    fetcher,
  );
  const { data: categories_data } = useSWR<GetCategoriesType>('/api/categories', fetcher);

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
