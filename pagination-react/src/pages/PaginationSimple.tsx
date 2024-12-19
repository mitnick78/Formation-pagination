import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const PaginationSimple: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      );
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit)); // Calcule le nombre total de pages
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">
        Pagination Classique
      </h1>
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
      <div className="flex justify-center mt-4 space-x-2">
        {/* Bouton Précédent */}
        <button
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Précédent
        </button>

        {/* Pagination Numérotée */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-2 rounded ${
              page === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Bouton Suivant */}
        <button
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default PaginationSimple;
