'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const NAV_LINKS = ['Shop', 'Skills', 'Stories', 'About', 'Contact Us'];
const SUB_NAV_LINKS = ['Men', 'Women', 'Babywear', 'Kids Wear', 'Home & Living', 'Beauty', 'Accessories', 'Footwear'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header} role="banner">
      {/* Top announcement bar removed per request */}

      {/* Main navigation */}
      <nav className={styles.mainNav} aria-label="Main navigation">
        {/* Hamburger – mobile */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="MUSER – Home">
          MUSER
        </Link>

        {/* Desktop nav links */}
        <ul className={styles.navLinks} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <Link
                href="/"
                className={styles.navLink}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action icons */}
        <div className={styles.navActions} aria-label="User actions">
          {/* Search */}
          <button className={styles.actionBtn} aria-label="Search" onClick={() => alert('Search clicked')}>
            <SearchIcon />
          </button>

          {/* Wishlist */}
          <button className={styles.actionBtn} aria-label="Wishlist" onClick={() => alert('Wishlist clicked')}>
            <HeartIcon />
          </button>

          {/* Cart */}
          <div className={styles.cartWrapper}>
            <button className={styles.actionBtn} aria-label="Shopping cart, 0 items" onClick={() => alert('Cart opened')}>
              <BagIcon />
            </button>
          </div>

          {/* Profile */}
          <button className={styles.actionBtn} aria-label="Account" onClick={() => alert('Profile clicked')}>
            <ProfileIcon />
          </button>

          {/* Language */}
          <button className={styles.langSelector} aria-label="Select language" onClick={() => alert('Language selector clicked')}>
            <span>ENG</span>
            <ChevronDownIcon />
          </button>
        </div>
      </nav>

      {/* Category sub-nav */}
      <nav className={styles.subNav} aria-label="Category navigation">
        {SUB_NAV_LINKS.map((link, i) => (
          <Link
            key={link}
            href="/"
            className={`${styles.subNavLink} ${i === 0 ? styles.active : ''}`}
          >
            {link}
          </Link>
        ))}
      </nav>
    </header>
  );
}

/* ── Inline SVG icons (no external package needed) ── */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
