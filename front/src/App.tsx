import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, DetailPage } from './pages';

const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/detail" element={<DetailPage />} />
  </Routes>
);

export default App;
