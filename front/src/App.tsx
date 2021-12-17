import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, DetailPage, SearchPage, CartPage } from './pages';

const user_id = 'test_c';
const getParams = (name: string) => new URLSearchParams(window.location.search).get(name) || '';

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <MainPage
          selected_small_category_id={parseInt(getParams('small_category_id'))}
          selected_big_category_id={parseInt(getParams('big_category_id'))}
        />
      }
    />
    <Route path="/detail" element={<DetailPage product_id={parseInt(getParams('product_id'))} />} />
    <Route path="/search" element={<SearchPage query={getParams('q')} />} />
    <Route path="/cart" element={<CartPage user_id={user_id} />} />
  </Routes>
);

export default App;
