import { Routes, Route } from 'react-router';

import InfiniteScrollPage from './pages/InfiniteScrollPage';
import PaginationSimple from './pages/PaginationSimple';
import Home from './pages/Home';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/infinite-scroll" element={<InfiniteScrollPage />} />
      <Route path="/page-based" element={<PaginationSimple />} />
    </Routes>
  );
};
