// app/page.js
// SSR: This is a React Server Component — data is fetched on the server at request time.

import { fetchProducts, fetchCategories, buildPLPSchema } from '../lib/api';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import PLPClient from './PLPClient';
import styles from './page.module.css';

// Force dynamic SSR (disable static generation for this route)
export const dynamic = 'force-dynamic';

export default async function ProductListingPage({ searchParams }) {
  const category = searchParams?.category || '';

  let products = [];
  let categories = [];
  let error = null;

  try {
    [products, categories] = await Promise.all([
      fetchProducts(category),
      fetchCategories(),
    ]);
  } catch (err) {
    console.error("API Fetch Error:", err);
    error = 'Failed to load products. Please try again later.';
  }

  // Build JSON-LD schema for SEO
  const schema = buildPLPSchema(products, 'Discover Our Collection');

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Header />

      <main id="main-content" className={styles.main}>
        {/* Hero / Page Title Section */}
        <section className={styles.heroSection} aria-label="Page heading">
          <h1 className={styles.heroTitle}>Discover Our Products</h1>
          <p className={styles.heroSubtitle}>
            We curate a selection of the finest handcrafted products from artisans around the world.
          </p>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><a href="/" className={styles.breadcrumbLink}>Home</a></li>
              <li aria-hidden="true" className={styles.breadcrumbSep}>›</li>
              <li aria-current="page" className={styles.breadcrumbCurrent}>
                {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
              </li>
            </ol>
          </nav>
        </section>

        {/* Category Tabs */}
        <PLPClient
          initialProducts={products}
          categories={categories}
          initialCategory={category}
          error={error}
        />
      </main>

      <Footer />
    </>
  );
}
