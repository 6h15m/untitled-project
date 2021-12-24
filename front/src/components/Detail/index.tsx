import { each, filter, map, pipe, reduce, toArray } from '@fxts/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { GetDetail as GetDetailType } from '../../../../models/model.interface';
import { changeCountType } from '../Cart/Card';
import { changeOptionPropertyType } from '../Cart';
import { Counter, DefaultInfo, Option } from '../index';
import * as S from './style';

let additional_prices: Array<number> = [];
let _option_property_ids: Array<number> = [];

export interface ProductDetailProps {
  detail_data: GetDetailType;
}

export const Detail = ({ detail_data }: ProductDetailProps) => {
  const [price, setPrice] = useState(detail_data.product.price);
  const [totalPrice, setTotalPrice] = useState(detail_data.product.price);
  const [count, setCount] = useState(1);

  const changeCount: changeCountType = (count) => {
    setTotalPrice(price * count);
    setCount(count);
  };

  const changeOptionProperty: changeOptionPropertyType = (
    option_property_id,
    additional_price,
    option_id,
  ) => {
    additional_prices[option_id - 1] = additional_price;
    _option_property_ids[option_id - 1] = option_property_id;
    setPrice(
      detail_data.product.price +
        pipe(
          additional_prices,
          filter((a) => !isNaN(a)),
          reduce((a, b) => a + b),
        ),
    );
  };

  const addCart = useCallback(() => {
    axios
      .post('/api/detail/addToCart', {
        user_id: 'test_c',
        product_id: detail_data.product.id,
        option_property_ids: pipe(
          _option_property_ids,
          filter((id) => id != null),
          toArray,
        ),
        product_amount: count,
      })
      .then(() => {
        alert('Product added to the cart! 🛒');
      });
  }, [detail_data.product.id, count]);

  useEffect(() => {
    each(
      (option) =>
        pipe(
          option.option_properties,
          filter((option_property) => option_property.base),
          each((option_property) => {
            _option_property_ids[option.id - 1] = option_property.id;
          }),
        ),
      detail_data.options,
    );
  }, [detail_data.options]);

  return (
    <S.ProductDetail>
      <S.ProductImg />
      <S.ProductInfoBox>
        <>
          <DefaultInfo detail_data={detail_data} />
          <S.ProductOptionsBox>
            {pipe(
              detail_data.options,
              map((option) => (
                <Option key={option.id} option={option} changeOptionProperty={changeOptionProperty} />
              )),
              toArray,
            )}
            <>
              <S.OptionNameText>EA</S.OptionNameText>
              <Counter default_count={count} changeCount={changeCount} />
            </>
          </S.ProductOptionsBox>
        </>
        <S.ProductInfoBottomBox>
          <S.ProductPriceText>{totalPrice.toLocaleString('ko-kr')}</S.ProductPriceText>
          <S.ProductToCartBtn onClick={addCart}>Add to Cart</S.ProductToCartBtn>
        </S.ProductInfoBottomBox>
      </S.ProductInfoBox>
    </S.ProductDetail>
  );
};
