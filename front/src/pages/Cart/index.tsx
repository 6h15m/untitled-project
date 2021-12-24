import React from 'react';
import trigger from 'swr';
import useSWR from 'swr';
import { GetCart as GetCartType } from '../../../../models/model.interface';
import { fetcher } from '../../@utils';
import { Cart, Header } from '../../components';

export interface CartPageProps {
  user_id: string;
}

export const CartPage = ({ user_id }: CartPageProps) => {
  const { data: cart_data } = useSWR<GetCartType>(`/api/cart/${user_id}`, fetcher);
  trigger(`/api/cart/${user_id}`);
  return (
    <>
      <Header />
      {cart_data && cart_data.cart.length !== 0 && <Cart cart_data={cart_data} />}
    </>
  );
};
