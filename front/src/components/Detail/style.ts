import styled from 'styled-components';

export const ProductDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductImg = styled.div`
  flex: 1;
  margin-right: 2rem;
  background-color: #e9ecef;
`;

export const ProductOptionsBox = styled.div`
  margin-top: 1.6rem;
`;

export const ProductInfoBox = styled.div`
  width: 25rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
`;

export const OptionNameText = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
`;

export const ProductInfoBottomBox = styled.div`
  width: inherit;
  margin-top: auto;
`;

export const ProductPriceText = styled.span`
  font-weight: 600;
  font-size: 1.6em;
  margin-bottom: 1.2rem;
  float: right;
`;

export const ProductToCartBtn = styled.button`
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
`;
