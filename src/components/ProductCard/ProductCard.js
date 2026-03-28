'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductCard.module.css';

/**
 * Generates a slug-friendly image alt text from product title
 * @param {string} title
 * @returns {string}
 */
function buildAltText(title) {
  return title ? `${title} – product image` : 'Product image';
}

/**
 * Renders filled/empty stars for a given rating (0–5)
 * @param {number} rating
 */
function StarRating({ rating }) {
  const fullStars = Math.round(rating);
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={styles.star} aria-hidden="true">
          {i < fullStars ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const {
    id,
    title,
    price,
    image,
    category,
    rating,
  } = product;

  // Convert price to INR
  const priceInr = price * 83;
  // Simulate a 20% "was" price for demo
  const originalPriceInr = priceInr * 1.25;
  const discountPct = Math.round(((originalPriceInr - priceInr) / originalPriceInr) * 100);

  // SEO-friendly image filename representation
  const seoImageAlt = buildAltText(title);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((prev) => !prev);
  };

  return (
    <article className={styles.card} aria-label={title}>
      {/* Image area */}
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={seoImageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={styles.cardImage}
          loading="lazy"
        />

        {/* Badges */}
        <div className={styles.badgeList} aria-hidden="true">
          <span className={`${styles.badge} ${styles.new}`}>New</span>
        </div>

        {/* Wishlist */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.active : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
          aria-pressed={wishlisted}
        >
          <HeartIcon />
        </button>

        {/* Quick add to cart – visible on hover */}
        <div className={styles.quickActions} aria-hidden="true">
          <button className={styles.addToCartBtn} tabIndex={-1} onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Item added to cart!'); }}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className={styles.cardInfo}>
        <span className={styles.brandName}>{category}</span>

        <h2 className={styles.productName}>{title}</h2>

        {/* Rating */}
        {rating && (
          <div className={styles.ratingRow}>
            <StarRating rating={rating.rate} />
            <span className={styles.reviewCount}>({rating.count})</span>
          </div>
        )}

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{Math.round(priceInr)}</span>
          <span className={styles.originalPrice}>₹{Math.round(originalPriceInr)}</span>
          <span className={styles.discountPct}>{discountPct}% off</span>
        </div>
      </div>
    </article>
  );
}

/* Skeleton state */
export function ProductCardSkeleton() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={`${styles.skeleton} ${styles.skeletonImage}`} />
      <div className={`${styles.skeleton} ${styles.skeletonLine}`} style={{ width: '50%' }} />
      <div className={`${styles.skeleton} ${styles.skeletonLine}`} />
      <div className={`${styles.skeleton} ${styles.skeletonLineShort}`} />
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
