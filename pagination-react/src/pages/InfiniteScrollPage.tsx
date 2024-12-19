import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const InfiniteScrollPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10;

  const fetchProducts = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      );
      const data = await response.json();

      setProducts((prev) => [...prev, ...data.products]);
      if (data.products.length < limit) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Erreur :', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        fetchProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">Scroll Infini</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border border-gray-300 rounded shadow"
          >
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="mt-2 font-bold">Prix : {product.price} €</p>
          </div>
        ))}
      </div>
      {isLoading && <p className="text-center mt-4">Chargement...</p>}
      {!hasMore && (
        <p className="text-center mt-4">Aucun produit supplémentaire.</p>
      )}
    </div>
  );
};

export default InfiniteScrollPage;
