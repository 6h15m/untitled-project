import React from 'react';
import useSWR from 'swr';
import { Header } from '../../Components/Header';
import { GetDetailType } from '../../../../models/data.interface';
import fetcher from '../../@utils/fetcher';
import { ProductDetail } from '../../Components/ProductDetail';

export const DetailPage = () => {
  const product_id = parseInt(new URLSearchParams(window.location.search).get('product_id') || '');

  const { data: detail_data } = useSWR<GetDetailType>(`/api/detail/${product_id}`, fetcher);

  return (
    <>
      <Header />
      {detail_data && <ProductDetail detail_data={detail_data} />}
    </>
  );
};
