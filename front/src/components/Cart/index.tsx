import { each, map, pipe, reduce, toArray } from '@fxts/core';
import React, { useState } from 'react';
import { changeTotalPriceType, GetCartsType } from '../../../../models/data.interface';
import { objToArray, productPriceCalc } from '../../@utils';
import { Card } from '../Card';
import * as S from './style';

let _product_total_prices: { [index: number]: number } = {};

export interface CartProps {
  carts_data: GetCartsType;
}

export const Cart = ({ carts_data }: CartProps) => {
  each((cart_data) => {
    _product_total_prices[cart_data.detailed_product.id] =
      productPriceCalc(cart_data) * cart_data.product_amount;
  }, carts_data.carts);

  const [totalPrice, setTotalPrice] = useState(
    pipe(
      objToArray(_product_total_prices),
      reduce((a, b) => a + b),
    ) || 0,
  );

  const changeTotalPrice: changeTotalPriceType = (detailed_product_id, total_price) => {
    _product_total_prices[detailed_product_id] = total_price;
    setTotalPrice(
      pipe(
        objToArray(_product_total_prices),
        reduce((a, b) => a + b),
      ) || 0,
    );
  };

  return (
    <S.Cart>
      <h2>{carts_data.user_id}'s Cart</h2>
      <S.CardsBox>
        {pipe(
          carts_data.carts,
          map((cart_data) => {
            return (
              <Card
                cart_data={cart_data}
                key={cart_data.detailed_product.id}
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
