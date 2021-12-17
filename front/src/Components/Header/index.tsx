import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const searchKeyPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(e.currentTarget.value);
      window.location.href = `http://localhost:3000/search?q=${e.currentTarget.value}`;
    }
  };
  return (
    <header>
      <HeaderWrap>
        <div className="left-container">
          <a className="title" href="http://localhost:3000">
            Untitled.
          </a>
          <input className="search-input" type="text" placeholder="Search" onKeyPress={searchKeyPressEvent} />
        </div>
        <div className="right-container">
          <Link to="/cart">Cart</Link>
        </div>
      </HeaderWrap>
    </header>
  );
};

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
