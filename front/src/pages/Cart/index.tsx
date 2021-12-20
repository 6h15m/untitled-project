import React from 'react';
import useSWR from 'swr';
import { GetCartsType } from '../../../../models/data.interface';
import { fetcher } from '../../@utils';
import { Cart, Header } from '../../components';

export interface CartPageProps {
  user_id: string;
}

export const CartPage = ({ user_id }: CartPageProps) => {
  const { data: carts_data } = useSWR<GetCartsType>(`/api/cart/${user_id}`, fetcher);

  return (
    <>
      <Header />
      {carts_data && <Cart carts_data={carts_data} />}
    </>
  );
};
