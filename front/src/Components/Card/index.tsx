import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { CartType, changeCountType, changeTotalPriceType } from '../../../../models/data.interface';
import { Counter } from '../Counter';
import { map, pipe, toArray } from '@fxts/core';
import axios from 'axios';
import { productPriceCalc } from '../../@utils';

export interface CardProps {
  cart_data: CartType;
  changeTotalPrice?: changeTotalPriceType;
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
  }, []);

  useEffect(() => {
    changeTotalPrice && changeTotalPrice(cart_data.detailed_product.id, totalPrice);
  }, [deleteCard, changeAmount]);

  return (
    <CardWrap>
      <ProductInfoContainer>
        <ProductInfo>
          <ProductName href={`../detail?product_id=${cart_data.detailed_product.product_id}`}>
            {cart_data.detailed_product.name}
          </ProductName>
          <ProductOptionProperties>
            {pipe(
              cart_data.detailed_product.option_properties,
              map(
                (option_property) =>
                  `${option_property.name}(+${option_property.additional_price.toLocaleString('ko-kr')}) `,
              ),
              toArray,
            )}
          </ProductOptionProperties>
        </ProductInfo>
        <ProductInfo right>
          <DeleteBtn onClick={deleteCard}>X</DeleteBtn>
          <ProductPrice>{product_price.toLocaleString('ko-kr')}</ProductPrice>
        </ProductInfo>
      </ProductInfoContainer>
      <CartInfoContainer>
        <Counter default_count={default_count} changeCount={changeAmount} />
        <TotalPrice>{totalPrice.toLocaleString('ko-kr')}</TotalPrice>
      </CartInfoContainer>
    </CardWrap>
  );
};

const ProductInfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  height: 5rem;
`;

const CartInfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: space-between;
  margin-top: 0.2rem;
`;

const ProductInfo = styled.div`
  ${(props: { right?: boolean }) =>
    props.right &&
    css`
      display: flex;
      flex-flow: column;
      align-items: end;
    `}
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: #485056;
  cursor: pointer;
`;

const ProductName = styled.a`
  font-size: 1.4em;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 0.6rem;
`;

const ProductOptionProperties = styled.div`
  color: #868e96;
  margin-top: 0.3rem;
`;

const ProductPrice = styled.div`
  margin-top: 0.6rem;
`;

const TotalPrice = styled.div`
  font-size: 1.4em;
  font-weight: 600;
`;

const CardWrap = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 10rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f8f9fa;
`;
