import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CartPage, CreatePage, DetailPage, MainPage, SearchPage } from './pages';

const user_id = 'test_c';

const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/detail" element={<DetailPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/cart" element={<CartPage user_id={user_id} />} />
    <Route path="/create" element={<CreatePage />} />
  </Routes>
);

export default App;
