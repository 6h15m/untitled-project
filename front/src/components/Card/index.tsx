import { map, pipe, toArray } from '@fxts/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { CartType } from '../../../../models/model.interface';
import { productPriceCalc } from '../../@utils';
import { changeTotalPriceType } from '../Cart';
import { Counter } from '../Counter';
import * as S from './style';

export type changeCountType = (count: number) => void;

export interface CardProps {
  cart_data: CartType;
  changeTotalPrice: changeTotalPriceType;
}

export const Card = ({ cart_data, changeTotalPrice }: CardProps) => {
  const default_count = cart_data.product_amount;
  const product_price = productPriceCalc(cart_data);
  const [amount, setAmount] = useState(cart_data.product_amount);
  const [totalPrice, setTotalPrice] = useState(product_price * amount);

  const changeAmount: changeCountType = (count) => {
    setAmount(count);
    setTotalPrice(product_price * count);
  };

  const deleteCard = useCallback(() => {
    axios
      .delete('/api/cart/deleteCartProduct', {
        data: { detailed_product_id: cart_data.detailed_product.id },
      })
      .then(() => {
        alert('Product deleted! 🗑');
      });
  }, [cart_data.detailed_product.id]);

  useEffect(() => {
    changeTotalPrice(cart_data.detailed_product.id, totalPrice);
  }, [changeTotalPrice, totalPrice, cart_data.detailed_product.id]);

  return (
    <S.Card>
      <S.ProductInfoBox>
        <S.ProductInfo>
          <S.ProductName to={`../detail?product_id=${cart_data.detailed_product.product_id}`}>
            {cart_data.detailed_product.name}
          </S.ProductName>
          <S.ProductOptionProperties>
            {pipe(
              cart_data.detailed_product.option_properties,
              map(
                (option_property) =>
                  `${option_property.name}(+${option_property.additional_price.toLocaleString('ko-kr')}) `,
              ),
              toArray,
            )}
          </S.ProductOptionProperties>
        </S.ProductInfo>
        <S.ProductInfo right>
          <S.DeleteBtn onClick={deleteCard}>X</S.DeleteBtn>
          <S.ProductPrice>{product_price.toLocaleString('ko-kr')}</S.ProductPrice>
        </S.ProductInfo>
      </S.ProductInfoBox>
      <S.CartInfoBox>
        <Counter default_count={default_count} changeCount={changeAmount} />
        <S.TotalPrice>{totalPrice.toLocaleString('ko-kr')}</S.TotalPrice>
      </S.CartInfoBox>
    </S.Card>
  );
};
