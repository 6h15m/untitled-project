import { map, pipe, toArray } from '@fxts/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { GetCard as GetCardType } from '../../../../../models/model.interface';
import { productPriceCalc } from '../../../@utils';
import { changeTotalPriceType } from '../index';
import { Counter } from '../../Counter';
import * as S from './style';

export type changeCountType = (count: number) => void;

export interface CardProps {
  card_data: GetCardType;
  changeTotalPrice: changeTotalPriceType;
}

export const Card = ({ card_data, changeTotalPrice }: CardProps) => {
  const default_count = card_data.product_amount;
  const product_price = productPriceCalc(card_data);
  const [amount, setAmount] = useState(card_data.product_amount);
  const [totalPrice, setTotalPrice] = useState(product_price * amount);

  const changeAmount: changeCountType = (count) => {
    setAmount(count);
    setTotalPrice(product_price * count);
  };

  const deleteCard = useCallback(() => {
    axios
      .delete('/api/cart/deleteCartProduct', {
        data: { detailed_product_id: card_data.detailed_product.id },
      })
      .then(() => {
        alert('Product deleted! 🗑');
      });
  }, [card_data.detailed_product.id]);

  useEffect(() => {
    changeTotalPrice(card_data.detailed_product.id, totalPrice);
  }, [changeTotalPrice, totalPrice, card_data.detailed_product.id]);

  return (
    <S.Card>
      <S.ProductInfoBox>
        <S.ProductInfo>
          <S.ProductName to={`../detail?product_id=${card_data.detailed_product.product_id}`}>
            {card_data.detailed_product.name}
          </S.ProductName>
          <S.ProductOptionProperties>
            {pipe(
              card_data.detailed_product.option_properties,
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
