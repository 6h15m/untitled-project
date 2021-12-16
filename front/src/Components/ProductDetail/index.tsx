import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { pipe, map, toArray, filter, reduce } from '@fxts/core';
import { GetDetailType, OptionPropertyType, OptionType } from '../../../../models/data.interface';
import { Tag } from '../Tag';
import { Counter } from '../Counter';
import axios from 'axios';

const DefaultInfo = ({ detail_data }: { detail_data: GetDetailType }) => (
  <DefaultInfoWrap>
    <div className="product-category-container">
      <a
        className="product-big-category"
        href={`http://localhost:3000/?big_category_id=${detail_data.big_category.id}`}
      >
        {detail_data.big_category.name}
      </a>
      <div className="product-category-arrow">{`>`}</div>
      <a
        className="product-small-category"
        href={`http://localhost:3000/?small_category_id=${detail_data.small_category.id}`}
      >
        {detail_data.small_category.name}
      </a>
    </div>
    <div className="product-name">{detail_data.product.name}</div>
    {pipe(
      detail_data.tags,
      map((tag) => <Tag key={tag.id} tag={tag} />),
      toArray,
    )}
  </DefaultInfoWrap>
);

const Option = ({ option, changeOptionProperty }: { option: OptionType; changeOptionProperty: Function }) => {
  return (
    <OptionWrap>
      <div className="option-name">{option.name}</div>
      <div className="option-properties-container">
        {pipe(
          option.option_properties,
          map((option_property) => (
            <OptionProperty
              key={option_property.id}
              option_property={option_property}
              changeOptionProperty={changeOptionProperty}
            />
          )),
          toArray,
        )}
      </div>
    </OptionWrap>
  );
};

const OptionProperty = ({
  option_property,
  changeOptionProperty,
}: {
  option_property: OptionPropertyType;
  changeOptionProperty: Function;
}) => {
  let first_checked = option_property.base;
  const [selectedOptionProperty, setSeletedOptionProperty] = useState<number>(option_property.id);
  const handleSelectedOptionProperty = (event: any) => {
    setSeletedOptionProperty(event.target.value);
    changeOptionProperty(selectedOptionProperty, option_property.additional_price, option_property.option_id);
  };
  return (
    <OptionPropertyWrap>
      <input
        type="radio"
        id={`${option_property.id}`}
        value={option_property.id}
        name={`${option_property.option_id}`}
        defaultChecked={first_checked}
        onChange={handleSelectedOptionProperty}
      />
      <label htmlFor={`${option_property.id}`}>
        {option_property.name}
        {option_property.additional_price === 0
          ? ''
          : `(+${option_property.additional_price.toLocaleString('ko-KR')})`}
      </label>
    </OptionPropertyWrap>
  );
};
let additional_prices: Array<number> = []; // ....
let _count: number;
let _option_property_ids: Array<number> = [];
export const ProductDetail = ({ detail_data }: { detail_data: GetDetailType }) => {
  const [price, setPrice] = useState(detail_data.product.price);
  const [totalPrice, setTotalPrice] = useState(detail_data.product.price);
  const changeCount = (count: number) => {
    setTotalPrice(price * count);
    _count = count;
  };
  const changeOptionProperty = (option_property_id: number, additional_price: number, option_id: number) => {
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

  const addCart = useCallback(
    (e) => {
      axios
        .post('/api/detail/addToCart', {
          user_id: 'test_c',
          product_id: detail_data.product.id,
          option_property_ids: pipe(
            _option_property_ids,
            filter((id) => id != null),
            toArray,
          ),
          product_amount: _count,
        })
        .then(() => {
          alert('Product added to the cart! 🛒');
        });
    },
    [_option_property_ids, _count],
  );

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
              <Counter default_count={1} changeCount={changeCount} />
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

const DefaultInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  .product-category-container {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  .product-category-arrow {
    margin: 0 0.3rem;
  }
  .product-name {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }
  .product-tags-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;

const OptionWrap = styled.div`
  .option-properties-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
  }
`;

const OptionPropertyWrap = styled.div`
  margin-right: 0.6rem;
  label {
    margin-left: 0.4rem;
  }
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
