import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { pipe, map, toArray, filter, reduce, each } from '@fxts/core';
import axios from 'axios';
import { changeCountType, changeOptionPropertyType, GetDetailType } from '../../../../models/data.interface';
import { Counter, DefaultInfo, Option } from '../index';

let additional_prices: Array<number> = [];
let _option_property_ids: Array<number> = [];

export interface ProductDetailProps {
  detail_data: GetDetailType;
}

export const ProductDetail = ({ detail_data }: ProductDetailProps) => {
  const default_count = 1;
  const [price, setPrice] = useState(detail_data.product.price);
  const [totalPrice, setTotalPrice] = useState(detail_data.product.price);
  const [count, setCount] = useState(default_count);

  useEffect(() => {
    pipe(
      detail_data.options,
      each((option) =>
        pipe(
          option.option_properties,
          filter((option_property) => option_property.base),
          each((option_property) => {
            _option_property_ids[option.id - 1] = option_property.id;
          }),
        ),
      ),
    );
  }, []);

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
  }, [_option_property_ids, count]);

  return (
    <ProductDetailWrap>
      <ProductImg />
      <div className="product-info-container">
        <div className="product-info-top-container">
          <DefaultInfo detail_data={detail_data} />
          <div className="product-options-container">
            {pipe(
              detail_data.options,
              map((option) => (
                <Option key={option.id} option={option} changeOptionProperty={changeOptionProperty} />
              )),
              toArray,
            )}
            <div className="product-ea-container">
              <div className="option-name">EA</div>
              <Counter default_count={default_count} changeCount={changeCount} />
            </div>
          </div>
        </div>
        <div className="product-info-bottom-container">
          <div className="product-price">{totalPrice.toLocaleString('ko-kr')}</div>
          <button className="product-to-cart-btn" onClick={addCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </ProductDetailWrap>
  );
};

const ProductImg = styled.div`
  flex: 1;
  margin-right: 2rem;
  background-color: #e9ecef;
`;

const ProductDetailWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .product-options-container {
    margin-top: 1.6rem;
  }
  .product-info-container {
    width: 25rem;
    height: 34rem;
    display: flex;
    flex-direction: column;
  }
  .option-name {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }
  .product-info-bottom-container {
    width: inherit;
    margin-top: auto;
  }
  .product-price {
    font-weight: 600;
    font-size: 1.6em;
    margin-bottom: 1.2rem;
    float: right;
  }
  .product-to-cart-btn {
    width: inherit;
    height: 3.6rem;
    margin-top: auto;
    background-color: #364fc7;
    border-radius: 0.2em;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
    border: none;
  }
`;
