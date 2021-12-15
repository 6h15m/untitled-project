import React from 'react';
import styled from 'styled-components';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => (
  <header>
    <HeaderWrap>
      <div className="left-container">
        <a className="title" href="http://localhost:3000">
          Untitled.
        </a>
        <input className="search-input" type="text" placeholder="Search" />
      </div>
      <div className="right-container">
        <a href="https://localhost:3000/cart">Cart</a>
      </div>
    </HeaderWrap>
  </header>
);

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;

  .left-container {
    display: flex;
    flex-direction: row;
  }
  .title {
    font-size: 2em;
    font-weight: bold;
  }
  .search-input {
    width: 14rem;
    height: 2rem;
    border: none;
    border-radius: 20px;
    margin-left: 1.2rem;
    padding: 1.2rem;
    background-color: #f8f9fa;
  }
`;
