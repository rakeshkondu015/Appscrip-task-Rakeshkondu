'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  Company: ['About Us', 'Stories', 'Artisans', 'Boutiques', 'Contact Us', 'EU Compliances Docs'],
  Quick_Links: ['Orders & Shipping', 'Join / Login as a Seller', 'Payment & Pricing', 'Return & Refunds', 'FAQs', 'Privacy Policy', 'Terms & Conditions'],
};

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.footerTop}>
        {/* Brand column */}
        <div className={styles.footerBrand}>
          <span className={styles.footerLogo} aria-label="MUSER">MUSER</span>
          <p className={styles.footerTagline}>
            Be with us, shop with us, be happy. Find exclusive handcrafted products from artisans around the world.
          </p>
          <div className={styles.socialLinks} aria-label="Social media links">
            <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://linkedin.com" className={styles.socialLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([colTitle, links]) => (
          <div key={colTitle} className={styles.footerCol}>
            <h3 className={styles.footerColTitle}>{colTitle.replace('_', ' ')}</h3>
            <ul className={styles.footerLinks} role="list">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className={styles.footerLink}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h3 className={styles.footerColTitle}>Follow Us</h3>
          <p className={styles.newsletterText}>
            Be the first to know about our new arrivals, exclusive offers and promotions.
          </p>
          <div className={styles.newsletterForm} role="form" aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your e-mail..."
              className={styles.newsletterInput}
              autoComplete="email"
            />
            <button className={styles.newsletterBtn} type="button" aria-label="Subscribe to newsletter" onClick={() => alert('Successfully subscribed to newsletter!')}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>
          © {new Date().getFullYear()} MUSER · All rights reserved.
        </p>
        <nav className={styles.footerBottomLinks} aria-label="Legal links">
          <Link href="/privacy" className={styles.footerBottomLink}>Privacy Policy</Link>
          <Link href="/terms" className={styles.footerBottomLink}>Terms</Link>
          <Link href="/cookies" className={styles.footerBottomLink}>Cookie Policy</Link>
        </nav>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
