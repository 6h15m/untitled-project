import React from 'react';
import useSWR from 'swr';
import { GetProducts as GetProductsType } from '../../../../models/model.interface';
import { fetcher } from '../../@utils';
import { GetParams } from '../../hooks';
import { Header, ProductList } from '../../components';

export interface SearchPageProps {}

export const SearchPage = () => {
  const query = GetParams('q');
  const { data: products_data } = useSWR<GetProductsType>(`/api/search/${query}`, fetcher);

  return (
    <>
      <Header />
      {products_data && <ProductList products_data={products_data} />}
    </>
  );
};
