import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './style';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const searchKeyPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(e.currentTarget.value);
      window.location.href = `/search?q=${e.currentTarget.value}`;
    }
  };
  return (
    <S.Header>
      <S.LeftBox>
        <S.TitleLink to="/">Untitled.</S.TitleLink>
        <S.SearchInput type="text" placeholder="Search" onKeyPress={searchKeyPressEvent} />
      </S.LeftBox>
      <S.RightBox>
        <Link to="/cart">Cart</Link>
      </S.RightBox>
    </S.Header>
  );
};
