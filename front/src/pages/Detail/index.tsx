import React from 'react';
import useSWR from 'swr';
import { GetDetailType } from '../../../../models/data.interface';
import { fetcher, getParams } from '../../@utils';
import { Header, ProductDetail } from '../../Components';

export interface DetailPageProps {}

export const DetailPage = ({}: DetailPageProps) => {
  const product_id = parseInt(getParams('product_id'));

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
