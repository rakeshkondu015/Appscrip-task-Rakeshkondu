'use client';

import { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FILTER_GROUPS = [
  {
    id: 'customise',
    title: 'Customisable',
    type: 'checkbox',
    options: [
      { label: 'Customisable', value: 'customisable' },
    ],
  },
  {
    id: 'idealFor',
    title: 'Ideal For',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Men', value: 'men', count: 12 },
      { label: 'Women', value: 'women', count: 18 },
      { label: 'Baby & Kids', value: 'kids', count: 6 },
    ],
  },
  {
    id: 'occasion',
    title: 'Occasion',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Wedding', value: 'wedding' },
      { label: 'Casual', value: 'casual' },
      { label: 'Festive', value: 'festive' },
      { label: 'Office', value: 'office' },
    ],
  },
  {
    id: 'work',
    title: 'Work',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Embroidery', value: 'embroidery' },
      { label: 'Print', value: 'print' },
      { label: 'Weave', value: 'weave' },
      { label: 'Dyeing', value: 'dyeing' },
    ],
  },
  {
    id: 'fabric',
    title: 'Fabric',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Cotton', value: 'cotton' },
      { label: 'Silk', value: 'silk' },
      { label: 'Polyester', value: 'polyester' },
      { label: 'Linen', value: 'linen' },
    ],
  },
  {
    id: 'segment',
    title: 'Segment',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Ethnic', value: 'ethnic' },
      { label: 'Western', value: 'western' },
      { label: 'Fusion', value: 'fusion' },
    ],
  },
  {
    id: 'suitable',
    title: 'Suitable For',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'South India', value: 'south-india' },
      { label: 'North India', value: 'north-india' },
    ],
  },
  {
    id: 'rawMaterial',
    title: 'Raw Materials',
    type: 'checkbox',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Natural Dyes', value: 'natural' },
      { label: 'Zari', value: 'zari' },
    ],
  },
  {
    id: 'price',
    title: 'Price',
    type: 'price',
  },
];

function FilterGroup({ group }) {
  const [open, setOpen] = useState(group.id === 'idealFor');
  const [checked, setChecked] = useState({});

  const toggleOption = (value) => {
    setChecked((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  return (
    <div className={styles.filterGroup}>
      <button
        className={styles.filterGroupHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`filter-body-${group.id}`}
      >
        <span className={styles.filterGroupTitle}>{group.title}</span>
        <span className={`${styles.chevron} ${open ? styles.open : ''}`} aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div className={styles.filterGroupBody} id={`filter-body-${group.id}`} role="group" aria-label={group.title}>
          {group.type === 'checkbox' &&
            group.options.map((opt) => (
              <label key={opt.value} className={styles.filterOption}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={!!checked[opt.value]}
                  onChange={() => toggleOption(opt.value)}
                  aria-label={opt.label}
                />
                <span className={`${styles.filterCheckbox} ${checked[opt.value] ? styles.checked : ''}`} aria-hidden="true">
                  {checked[opt.value] && <CheckIcon />}
                </span>
                <span className={styles.filterLabel}>{opt.label}</span>
                {opt.count && <span className={styles.filterCount}>({opt.count})</span>}
              </label>
            ))}

          {group.type === 'price' && (
            <PriceFilter />
          )}
        </div>
      )}
    </div>
  );
}

function PriceFilter() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  return (
    <div className={styles.priceRange}>
      <div className={styles.priceInputRow}>
        <label htmlFor="price-min" className="sr-only">Minimum price</label>
        <input
          id="price-min"
          type="number"
          min="0"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className={styles.priceInput}
        />
        <span className={styles.priceSeparator} aria-hidden="true">–</span>
        <label htmlFor="price-max" className="sr-only">Maximum price</label>
        <input
          id="price-max"
          type="number"
          min="0"
          placeholder="Max"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          className={styles.priceInput}
        />
      </div>
      <button className={styles.applyBtn} type="button" onClick={() => alert(`Price filter applied: ${min || 0} to ${max || 'Max'}`)}>Apply</button>
    </div>
  );
}

export default function FilterSidebar({ isOpen, onClose }) {
  const sidebarContent = (
    <>
      {FILTER_GROUPS.map((group) => (
        <FilterGroup key={group.id} group={group} />
      ))}
      <button className={styles.clearBtn} type="button" onClick={() => alert('All filters cleared!')}>
        Clear All Filters
      </button>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar} aria-label="Product filters">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className={`${styles.mobileDrawer} ${isOpen ? styles.open : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
          >
            <div className={styles.drawerHeader}>
              <h2 className={styles.drawerTitle}>Filters</h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close filters">
                <CloseIcon />
              </button>
            </div>
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
