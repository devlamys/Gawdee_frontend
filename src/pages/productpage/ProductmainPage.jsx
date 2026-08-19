import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import ProductCard from '@/component/common/ProductCard';
import { ProductSkeleton } from '@/component/ui/Skeleton';
import { ApiGet } from '@/helper/axios';
import { Search, Filter, SlidersHorizontal, PackageX } from 'lucide-react';
import { Meta } from '@/component/common/Meta';
import { extractProductsList, extractCategoriesList, normalizeProduct } from '@/utils/productHelper';

export default function ProductmainPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products from both admin and user routes as fallbacks
        let prodRes;
        try {
          prodRes = await ApiGet('/admin/products');
        } catch {
          prodRes = await ApiGet('/products');
        }

        let catRes;
        try {
          catRes = await ApiGet('/admin/categories');
        } catch {
          catRes = await ApiGet('/categories');
        }

        const rawProdList = extractProductsList(prodRes);
        const rawCatList = extractCategoriesList(catRes);

        const normalizedProducts = rawProdList.map(normalizeProduct).filter(Boolean);

        setProducts(normalizedProducts);
        setCategories(rawCatList);
      } catch (err) {
        console.error('Fetch products error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      prod.categoryId === selectedCategory ||
      prod.categoryId?._id === selectedCategory ||
      prod.category?.toLowerCase() === selectedCategory.toLowerCase();

    const name = prod.name || prod.title || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.salePrice || a.price || 0);
    const priceB = Number(b.salePrice || b.price || 0);

    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta
        title="Shop All Pure Organic Products & A2 Ghee | Gawdee"
        description="Browse Gawdee's complete range of A2 Gir Cow Bilona Ghee, Raw Forest Honey, Taral Ayurvedic Drops, and daily family nutrition powders."
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Gawdee Storefront
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">
            All Pure Products
          </h1>
          <p className="text-xs text-gray-600 font-light">
            Crafted from 100% natural ingredients, free-grazing Gir cow milk, and raw forest harvests.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#113826] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat._id
                    ? 'bg-[#113826] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-[#113826] focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 text-xs border border-gray-200 rounded-xl focus:border-[#113826] focus:outline-none bg-white font-medium text-gray-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <ProductSkeleton key={n} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-xl mx-auto space-y-4 my-8 shadow-sm">
            <PackageX className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">No products found</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#113826] text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
