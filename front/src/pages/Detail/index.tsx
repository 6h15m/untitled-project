import React from 'react';
import useSWR from 'swr';
import { GetDetailType } from '../../../../models/data.interface';
import fetcher from '../../@utils/fetcher';
import { Header, ProductDetail } from '../../Components';

export interface DetailPageProps {}

export const DetailPage = (props: DetailPageProps) => {
  const product_id = parseInt(new URLSearchParams(window.location.search).get('product_id') || '');

  const { data: detail_data } = useSWR<GetDetailType>(`/api/detail/${product_id}`, fetcher);

  return (
    <>
      <Header />
      {detail_data && <ProductDetail detail_data={detail_data} />}
    </>
  );
};
