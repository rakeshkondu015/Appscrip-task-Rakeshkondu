'use client';

import { useState, useEffect, useTransition } from 'react';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import styles from './page.module.css';

/**
 * PLPClient handles all interactive/client-side behaviour:
 * - Category tab switching
 * - Filter sidebar open/close
 * - Client-side refetch when category changes
 */
export default function PLPClient({ initialProducts, categories, initialCategory, error }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || '');
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(error);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Refetch when category changes on client
  useEffect(() => {
    if (activeCategory === initialCategory) return; // skip initial render

    setIsLoading(true);
    setFetchError(null);

    const url = activeCategory
      ? `https://dummyjson.com/products/category/${encodeURIComponent(activeCategory)}`
      : 'https://dummyjson.com/products?limit=20';

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        const mappedProducts = data.products.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          category: p.category,
          description: p.description,
          image: p.thumbnail,
          rating: { rate: p.rating, count: p.stock }
        }));
        startTransition(() => setProducts(mappedProducts));
      })
      .catch(() => {
        setFetchError('Failed to load products. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    // Update URL without full page reload (shallow routing)
    const url = cat ? `?category=${encodeURIComponent(cat)}` : '/';
    window.history.replaceState(null, '', url);
  };

  return (
    <>
      {/* Category filter tabs */}
      <section className={styles.categorySection} aria-label="Filter by category">
        <nav className={styles.categoryTabs} role="tablist" aria-label="Product categories">
          <button
            role="tab"
            aria-selected={activeCategory === ''}
            className={`${styles.categoryTab} ${activeCategory === '' ? styles.activeTab : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.categoryTab} ${activeCategory === cat ? styles.activeTab : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
      </section>

      {/* Product listing layout: Sidebar + Grid */}
      <section className={styles.listingSection} aria-label="Product listing">
        {/* Desktop filter sidebar */}
        <div className={styles.sidebarWrapper}>
          <FilterSidebar isOpen={false} onClose={() => {}} />
        </div>

        {/* Product grid */}
        <div className={styles.gridWrapper}>
          <ProductGrid
            products={products}
            isLoading={isLoading || isPending}
            error={fetchError}
          />
        </div>
      </section>

      {/* About section (SEO H2 content) */}
      <section className={styles.aboutSection} aria-label="About our collection">
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>About Our Collection</h2>
          <p className={styles.aboutText}>
            Our carefully curated marketplace brings together artisans and craftspeople from across
            India and beyond. Each product tells a story — of heritage, skill, and passion. From
            hand-embroidered textiles to fine jewellery and cutting-edge electronics, we offer
            something unique for every taste and occasion.
          </p>
          <p className={styles.aboutText}>
            We believe in fair trade, sustainable practices, and empowering local communities. When
            you shop with us, you&apos;re not just buying a product — you&apos;re supporting livelihoods and
            keeping ancient crafts alive.
          </p>
        </div>
      </section>
    </>
  );
}
