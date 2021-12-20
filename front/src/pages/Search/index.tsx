import React from 'react';
import useSWR from 'swr';
import { GetProductsType } from '../../../../models/data.interface';
import { fetcher, getParams } from '../../@utils';
import { Header, ProductList } from '../../components';

export interface SearchPageProps {}

export const SearchPage = () => {
  const query = getParams('q');
  const { data: products_data } = useSWR<GetProductsType>(`/api/search/${query}`, fetcher);

  return (
    <>
      <Header />
      {products_data && <ProductList products_data={products_data} />}
    </>
  );
};
