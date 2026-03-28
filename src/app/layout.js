// app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'MUSER | Discover Curated Fashion & Lifestyle',
  description:
    'Explore our handpicked collection of clothing, jewellery, and electronics. Shop the latest trends with exclusive deals and free shipping.',
  keywords: 'fashion, clothing, jewellery, electronics, online shopping, trending products',
  openGraph: {
    title: 'MUSER | Discover Curated Fashion & Lifestyle',
    description:
      'Explore our handpicked collection of clothing, jewellery, and electronics.',
    type: 'website',
    url: 'https://appscrip-task.netlify.app/',
    images: [
      {
        url: 'https://appscrip-task.netlify.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MUSER – Curated Fashion & Lifestyle Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUSER | Discover Curated Fashion & Lifestyle',
    description: 'Explore our handpicked collection of products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://appscrip-task.netlify.app/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fakestoreapi.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
