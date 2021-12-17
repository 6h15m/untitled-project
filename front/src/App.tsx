import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, DetailPage } from './pages';
import { SearchPage } from './pages/Search';

const selected_small_category_id =
  parseInt(new URLSearchParams(window.location.search).get('small_category_id') || '') || null;
const selected_big_category_id =
  parseInt(new URLSearchParams(window.location.search).get('big_category_id') || '') || null;
const product_id = parseInt(new URLSearchParams(window.location.search).get('product_id') || '') || null;
const query = new URLSearchParams(window.location.search).get('q') || '';

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
    <Route path="/search" element={<SearchPage query={query} />} />
  </Routes>
);

export default App;
