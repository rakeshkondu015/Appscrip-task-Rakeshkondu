'use client';

import styles from './error.module.css';

export default function ErrorPage({ error, reset }) {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button className={styles.retryBtn} onClick={reset}>
          Try Again
        </button>
      </div>
    </main>
  );
}
