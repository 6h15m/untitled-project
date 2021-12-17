import React, { useState } from 'react';
import styled from 'styled-components';
import { changeTotalPriceType, GetCartsType } from '../../../../models/data.interface';
import { each, map, pipe, reduce, toArray } from '@fxts/core';
import { Card } from '../Card';
import { productPriceCalc } from '../../@utils';

export interface CartProps {
  carts_data: GetCartsType;
}
let _product_total_prices: { [index: number]: number } = {};

function* objToArray(obj: { [index: number]: number }) {
  for (const o in obj) yield obj[o];
}

export const Cart = ({ carts_data }: CartProps) => {
  pipe(
    carts_data.carts,
    each((cart_data) => {
      _product_total_prices[cart_data.detailed_product.id] =
        productPriceCalc(cart_data) * cart_data.product_amount;
    }),
  );
  console.log(_product_total_prices);
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
    <CartWrap>
      <h2>{carts_data.user_id}'s Cart</h2>
      <>
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
      </>
      <TotalPriceContainer>
        <h3>Total Price</h3>
        <TotalPrice>{totalPrice.toLocaleString('ko-kr')}</TotalPrice>
      </TotalPriceContainer>
    </CartWrap>
  );
};

const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1em;
  align-self: flex-end;
`;

const TotalPrice = styled.div`
  margin-left: 0.6rem;
  font-weight: 600;
  font-size: 1.8em;
`;

const CartWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
