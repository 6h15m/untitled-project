import React from 'react';
import useSWR from 'swr';
import { Header } from '../../Components/Header';
import { ProductList } from '../../Components/ProductList';
import { GetProductsType } from '../../../../models/data.interface';
import fetcher from '../../@utils/fetcher';

export const Main = () => {
  const { data: productsData } = useSWR<GetProductsType>('/api/products', fetcher);

  return (
    <>
      <Header />
      {productsData && <ProductList productsData={productsData} />}
    </>
  );
};
