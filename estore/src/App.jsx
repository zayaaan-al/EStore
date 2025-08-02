import React, { useState, useEffect } from 'react';
import './App.css'
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || product.category === category)
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  return (
    
    <div className="min-h-screen p-4 bg-gray-50 font-sans ">
      <Navbar/>
      <h1 className="text-3xl font-bold text-center mb-6 mt-7">📦 Product Listing</h1>

      {/* Search + Category Filters */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6 w-full max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading + Products */}
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No products found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition duration-300"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
                <p className="text-blue-600 font-semibold">₹{product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap text-sm sm:text-base">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              ⬅ Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
      <Footer/>
    </div>
  );
}

export default App;
