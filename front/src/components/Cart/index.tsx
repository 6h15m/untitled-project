import { map, pipe, reduce, toArray } from '@fxts/core';
import React, { useState } from 'react';
import { GetCart as GetCartType } from '../../../../models/model.interface';
import { productPriceCalc } from '../../@utils';
import { Card } from '../Card';
import * as S from './style';

export type changeTotalPriceType = (detailed_product_id: number, total_price: number) => void;

export type changeOptionPropertyType = (
  option_property_id: number,
  additional_price: number,
  option_id: number,
) => void;

export interface CartProps {
  cart_data: GetCartType;
}

export const Cart = ({ cart_data }: CartProps) => {
  const totalPrices = pipe(
    cart_data.cart,
    map((card_data) => ({
      [card_data.detailed_product.id]: productPriceCalc(card_data) * card_data.product_amount,
    })),
    reduce((a, b) => ({ ...a, ...b })),
  );

  const [totalPrice, setTotalPrice] = useState(
    pipe(
      Object.values(totalPrices),
      reduce((a, b) => a + b),
    ) || 0,
  );

  const changeTotalPrice: changeTotalPriceType = (detailed_product_id, total_price) => {
    totalPrices[detailed_product_id] = total_price;
    setTotalPrice(
      pipe(
        Object.values(totalPrices),
        reduce((a, b) => a + b),
      ) || 0,
    );
  };

  return (
    <S.Cart>
      <h2>{cart_data.user_id}'s Cart</h2>
      <S.CardsBox>
        {pipe(
          cart_data.cart,
          map((card_data) => {
            return (
              <Card
                card_data={card_data}
                key={card_data.detailed_product.id}
                changeTotalPrice={changeTotalPrice}
              />
            );
          }),
          toArray,
        )}
      </S.CardsBox>
      <S.TotalPriceBox>
        <h3>Total Price</h3>
        <S.TotalPrice>{totalPrice.toLocaleString('ko-kr')}</S.TotalPrice>
      </S.TotalPriceBox>
    </S.Cart>
  );
};
