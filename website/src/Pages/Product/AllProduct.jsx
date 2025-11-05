import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import AppContext from "../../Context/AppContext";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllProduct = () => {
  const { products, categories } = useContext(AppContext);
  const brands = [...new Set(products.map((p) => p.brand))];

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    maxPrice: 2000,
    sort: "relevance",
    search: "",
  });

  const [filtered, setFiltered] = useState(products);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let list = products.filter((p) => p.price <= filters.maxPrice);

      if (filters.categories.length) {
        list = list.filter((p) => {
          const prodCatId =
            typeof p.category === "string" ? p.category : p.category.$oid;
          return filters.categories.includes(prodCatId);
        });
      }

      if (filters.brands.length)
        list = list.filter((p) => filters.brands.includes(p.brand));

      if (filters.search)
        list = list.filter((p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase())
        );

      switch (filters.sort) {
        case "price_asc":
          list.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          list.sort((a, b) => b.price - a.price);
          break;
        case "name_asc":
          list.sort((a, b) => a.brand.localeCompare(b.brand));
          break;
        case "name_desc":
          list.sort((a, b) => b.brand.localeCompare(a.brand));
          break;
      }

      setFiltered(list);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, products]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const arr = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: arr };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  px-4 sm:px-8 py-6">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`
    rounded-xl p-5 shadow-md border
    bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700
    h-fit max-h-[90vh] overflow-y-auto
    ${showFilters ? "block" : "hidden"} md:block
    w-80 md:w-80 lg:w-80
  `}
        >
          <h3
            className="font-semibold text-lg mb-4 border-b pb-2
      text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-600"
          >
            Filters
          </h3>

          {/* Category */}
          {categories.map((c) => (
            <label
              key={c._id}
              className="flex items-center gap-2 text-sm mb-1 text-gray-900 dark:text-gray-100"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(c._id)}
                onChange={() => handleCheckboxChange("categories", c._id)}
                className="accent-indigo-500"
              />
              {c.name}
            </label>
          ))}

          {/* Brand Dropdown */}
          <div className="mb-5 mt-4">
            <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Brand
            </h4>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm
        focus:ring-2 focus:ring-indigo-400
        bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
        text-gray-900 dark:text-gray-100"
              value={filters.brand || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  brand: e.target.value,
                })
              }
            >
              <option value="">All Brands</option>
              {brands.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-5 mt-4">
            <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Max Price: ₹{filters.maxPrice}
            </h4>
            <input
              type="range"
              min="0"
              max="2000"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Sort */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Sort By
            </h4>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm
        focus:ring-2 focus:ring-indigo-400
        bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
        text-gray-900 dark:text-gray-100"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="name_asc">Name A → Z</option>
              <option value="name_desc">Name Z → A</option>
            </select>
          </div>
        </aside>

        {/* Product Section */}
        <section className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
          {/* Header Row (Sticky) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
            {/* Left: Title */}
            <h2 className="text-lg font-semibold sm:w-1/3 text-center sm:text-left text-gray-900 dark:text-gray-100">
              All Products
            </h2>

            {/* Center: Search */}
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search product name"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full rounded-md border px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-400
                  bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Product List with Scroll (Fixed 400px height) */}
          <div className="h-[800px] overflow-y-auto p-5  custom-scroll">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-300 py-10">
                No products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="px-2 sm:px-3 md:px-4"
                  >
                    <ProductCard key={product._id} {...product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllProduct;
