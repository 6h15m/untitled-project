import React from 'react';
import useSWR from 'swr';
import { GetDetail as GetDetailType } from '../../../../models/model.interface';
import { fetcher } from '../../@utils';
import { GetParams } from '../../hooks';
import { Header, ProductDetail } from '../../components';

export interface DetailPageProps {}

export const DetailPage = ({}: DetailPageProps) => {
  const product_id = parseInt(GetParams('product_id'));

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
