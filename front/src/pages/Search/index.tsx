import React from 'react';
import useSWR from 'swr';
import { GetProductsType } from '../../../../models/data.interface';
import { fetcher } from '../../@utils';
import { Header, ProductList } from '../../Components';

export interface SearchPageProps {
  query: string | '';
}

export const SearchPage = ({ query }: SearchPageProps) => {
  const { data: products_data } = useSWR<GetProductsType>(`/api/search/${query}`, fetcher);

  return (
    <>
      <Header />
      {products_data && <ProductList products_data={products_data} />}
    </>
  );
};
