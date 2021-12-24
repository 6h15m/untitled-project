import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 10rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f8f9fa;
`;

export const ProductInfoBox = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  height: 5rem;
`;

export const CartInfoBox = styled.div`
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: space-between;
  margin-top: 0.2rem;
`;

export const ProductInfo = styled.div`
  ${(props: { right?: boolean }) =>
    props.right &&
    css`
      display: flex;
      flex-flow: column;
      align-items: end;
    `}
`;

export const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  color: #485056;
  cursor: pointer;
`;

export const ProductName = styled(Link)`
  font-size: 1.4em;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 0.6rem;
`;

export const ProductOptionProperties = styled.div`
  color: #868e96;
  margin-top: 0.3rem;
`;

export const ProductPrice = styled.div`
  margin-top: 0.6rem;
`;

export const TotalPrice = styled.div`
  font-size: 1.4em;
  font-weight: 600;
`;
