import styles from './loading.module.css';

export default function LoadingPage() {
  return (
    <main className={styles.container}>
      <div className={styles.heroSkeleton}>
        <div className={`skeleton ${styles.titleSkeleton}`} />
        <div className={`skeleton ${styles.subtitleSkeleton}`} />
      </div>

      <div className={styles.tabsSkeleton}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`skeleton ${styles.tabSkeleton}`} />
        ))}
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebarSkeleton}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.filterSkeleton}`} />
          ))}
        </div>
        <div className={styles.gridSkeleton}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={styles.cardSkeleton}>
              <div className={`skeleton ${styles.cardImageSkeleton}`} />
              <div className={`skeleton ${styles.cardLineSkeleton}`} style={{ width: '60%' }} />
              <div className={`skeleton ${styles.cardLineSkeleton}`} />
              <div className={`skeleton ${styles.cardLineSkeleton}`} style={{ width: '40%' }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
