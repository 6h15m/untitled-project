import React from 'react';
import useSWR from 'swr';
import { GetDetailType } from '../../../../models/data.interface';
import { fetcher } from '../../@utils';
import { Header, ProductDetail } from '../../Components';

export interface DetailPageProps {
  product_id: number | null;
}

export const DetailPage = ({ product_id }: DetailPageProps) => {
  const { data: detail_data } = useSWR<GetDetailType>(
    product_id ? `/api/detail/${product_id}` : `/api/detail/1`,
    fetcher,
  );

  return (
    <>
      <Header />
      {detail_data && <ProductDetail detail_data={detail_data} />}
    </>
  );
};
