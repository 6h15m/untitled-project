import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Product = styled(Link)`
  width: 12rem;
  height: 14rem;
  background-color: #e9ecef;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  flex-flow: column;
  margin-right: 2rem;
  margin-bottom: 2rem;
`;

export const ProductNameText = styled.span``;
