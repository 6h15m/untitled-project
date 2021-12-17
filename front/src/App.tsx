import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, DetailPage } from './pages';

const selected_small_category_id =
  parseInt(new URLSearchParams(window.location.search).get('small_category_id') || '') || null;
const selected_big_category_id =
  parseInt(new URLSearchParams(window.location.search).get('big_category_id') || '') || null;
const product_id = parseInt(new URLSearchParams(window.location.search).get('product_id') || '') || null;

const App = () => (
  <Routes>
    <Route
      path="/"
      element={
        <MainPage
          selected_small_category_id={selected_small_category_id}
          selected_big_category_id={selected_big_category_id}
        />
      }
    />
    <Route path="/detail" element={<DetailPage product_id={product_id} />} />
  </Routes>
);

export default App;
