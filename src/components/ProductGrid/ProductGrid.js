'use client';

import { useState, useMemo } from 'react';
import ProductCard, { ProductCardSkeleton } from '../ProductCard/ProductCard';
import SortBar from '../SortBar/SortBar';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import styles from './ProductGrid.module.css';

const PAGE_SIZE = 12;

/**
 * Sorts products based on the selected sort value
 * @param {Array} products
 * @param {string} sortValue
 * @returns {Array}
 */
function sortProducts(products, sortValue) {
  const sorted = [...products];
  switch (sortValue) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      return sorted.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted; // recommended — original order
  }
}

export default function ProductGrid({ products = [], isLoading = false, error = null }) {
  const [sortValue, setSortValue] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedProducts = useMemo(() => sortProducts(products, sortValue), [products, sortValue]);

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSortChange = (val) => {
    setSortValue(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Grid column class based on view mode
  const gridClass = viewMode === 'list' ? '' : styles.cols4;

  if (error) {
    return (
      <div className={styles.errorState} role="alert">
        <p className={styles.errorTitle}>Something went wrong</p>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      <SortBar
        totalProducts={sortedProducts.length}
        sortValue={sortValue}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFilterOpen={() => setFilterOpen(true)}
      />

      {/* Mobile filter sidebar (rendered inside ProductGrid for context) */}
      <FilterSidebar isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

      {isLoading ? (
        <div className={`${styles.grid} ${gridClass}`} aria-label="Loading products" aria-busy="true">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">🛍️</div>
          <h2 className={styles.emptyTitle}>No products found</h2>
          <p className={styles.emptyText}>Try adjusting your filters or browse a different category.</p>
        </div>
      ) : (
        <>
          <ol
            className={viewMode === 'list' ? styles.listView : `${styles.grid} ${gridClass}`}
            aria-label="Product listing"
          >
            {paginatedProducts.map((product) => (
              <li key={product.id} style={{ listStyle: 'none' }}>
                <ProductCard product={product} />
              </li>
            ))}
          </ol>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Product listing pagination">
              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
