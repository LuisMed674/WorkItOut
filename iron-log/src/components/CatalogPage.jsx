import { useState } from 'react';
import { CATALOG } from '../data/catalog';

export default function CatalogPage({ onBack }) {
  const [filter, setFilter] = useState('all');
  const sections = CATALOG.filter((s) => filter === 'all' || s.muscle === filter);

  return (
    <section className="page catalog">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}><i className="bi bi-arrow-left" /> Back to Log</button>
        <div className="title-block">
          <h2><i className="bi bi-grid me-2" style={{ color: 'var(--gold)' }} />Exercise Catalog</h2>
          <p>Browse exercises by target muscle group</p>
        </div>
      </div>

      <div className="catalog-filters">
        {['all', ...CATALOG.map((c) => c.muscle)].map((f) => (
          <button key={f} className={`filter-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {sections.map(({ muscle, icon, items }) => (
        <div className="catalog-section" key={muscle}>
          <div className="catalog-section-header">
            <span className="catalog-section-title">
              <i className={`bi bi-${icon} me-2`} style={{ color: 'var(--gold)', fontSize: 18, verticalAlign: 'middle' }} />{muscle}
            </span>
            <span className="catalog-section-count">{items.length} exercises</span>
            <div className="catalog-section-line" />
          </div>
          <div className="exercise-grid">
            {items.map(([name, type, equip]) => (
              <div className="exercise-card" key={name}>
                <div className="exercise-card-name">{name}</div>
                <div className="exercise-card-meta">
                  {type
                    ? <span className={`exercise-card-tag ${type === 'c' ? 'compound' : 'isolation'}`}>{type === 'c' ? 'Compound' : 'Isolation'}</span>
                    : <span className="exercise-card-tag">Cardio</span>}
                  <span className="exercise-card-tag">{equip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
