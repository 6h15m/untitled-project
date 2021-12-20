import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

export const LeftBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RightBox = styled.div`
  display: flex;
`;

export const TitleLink = styled(Link)`
  font-size: 2em;
  font-weight: bold;
`;

export const SearchInput = styled.input`
  width: 14rem;
  height: 2rem;
  border: none;
  border-radius: 20px;
  margin-left: 1.2rem;
  padding: 1.2rem;
  background-color: #f8f9fa;
`;
