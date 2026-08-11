import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CartProvider } from './hooks/useCart';
import Home from './pages/Home';

const ProductPage = lazy(() => import('./pages/ProductPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <CartProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </CartProvider>
  );
}
