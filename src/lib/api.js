// lib/api.js
// Fetches product data from FakeStore API

const API_BASE = 'https://fakestoreapi.com';

/**
 * Fetch all products
 * @param {string} category - optional category filter
 * @returns {Promise<Array>}
 */
export async function fetchProducts(category = '') {
  const url = category
    ? `${API_BASE}/products/category/${encodeURIComponent(category)}`
    : `${API_BASE}/products`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch all available categories
 * @returns {Promise<Array<string>>}
 */
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/products/categories`, {
    next: { revalidate: 86400 }, // ISR: revalidate every day
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch a single product by ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }

  return res.json();
}

/**
 * Build structured schema.org JSON-LD for a product listing page
 * @param {Array} products
 * @param {string} pageTitle
 * @returns {Object}
 */
export function buildPLPSchema(products, pageTitle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: 'Browse our curated collection of products.',
    url: 'https://appscrip-task.netlify.app/',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          description: product.description,
          image: product.image,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          aggregateRating: product.rating
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating.rate,
                reviewCount: product.rating.count,
              }
            : undefined,
        },
      })),
    },
  };
}
