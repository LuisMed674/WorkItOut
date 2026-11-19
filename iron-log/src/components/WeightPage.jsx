import { useEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { addDays, todayStr, parse } from '../lib/dates';

const KG = 0.45359237;
const RANGES = [['30', '30d'], ['90', '90d'], ['180', '6m'], ['0', 'All']];
const r1 = (n) => Math.round(n * 10) / 10;

export default function WeightPage({ entries, setEntries, onBack }) {
  const [range, setRange] = useState('30');
  const [unit, setUnit] = useState('lbs');
  const [date, setDate] = useState(todayStr());
  const [weight, setWeight] = useState('');
  const [inputUnit, setInputUnit] = useState('lbs');
  const canvas = useRef(null);


  const conv = (lbs) => r1(unit === 'kg' ? lbs * KG : lbs);

  const visible = useMemo(() => {
    if (range === '0') return entries;
    const cutoff = addDays(new Date(), -Number(range));
    return entries.filter((e) => parse(e.date) >= cutoff);
  }, [entries, range]);

  const stats = useMemo(() => {
    if (!entries.length) return null;
    const vals = entries.map((e) => conv(e.valueLbs));
    const cur = vals[vals.length - 1], start = vals[0];
    return { cur, start, change: r1(cur - start), low: Math.min(...vals), high: Math.max(...vals) };
  }, [entries, unit]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const chart = new Chart(canvas.current, {
      type: 'line',
      data: {
        labels: visible.map((e) => e.date),
        datasets: [{
          data: visible.map((e) => conv(e.valueLbs)),
          borderColor: '#F0B429', backgroundColor: 'rgba(240,180,41,.1)',
          fill: true, tension: 0.3, pointRadius: 3, pointBackgroundColor: '#F0B429',
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#8892A4' }, grid: { color: '#2C313A' } },
          y: { ticks: { color: '#8892A4' }, grid: { color: '#2C313A' } },
        },
      },
    });
    return () => chart.destroy();
  }, [visible, unit]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = () => {
    const v = parseFloat(weight);
    if (!date || !v || v <= 0) return alert('Enter a date and a valid weight.');
    const valueLbs = r1(inputUnit === 'kg' ? v / KG : v);
    setEntries([...entries.filter((e) => e.date !== date), { date, valueLbs }]
      .sort((a, b) => a.date.localeCompare(b.date)));
    setWeight('');
  };

  const remove = (d) => setEntries(entries.filter((e) => e.date !== d));

  const deltaFor = (e) => {
    const i = entries.findIndex((x) => x.date === e.date);
    return i > 0 ? r1(conv(e.valueLbs) - conv(entries[i - 1].valueLbs)) : null;
  };

  const stat = (label, value, cls = '') => (
    <div className="wt-stat">
      <div className="wt-stat-label">{label}</div>
      <div className={`wt-stat-value ${cls}`}>
        {value ?? '—'}{value != null && label !== 'Entries' && <span className="wt-stat-unit">{unit}</span>}
      </div>
    </div>
  );

  return (
    <section className="page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}><i className="bi bi-arrow-left" /> Back to Log</button>
        <div className="title-block">
          <h2><i className="bi bi-graph-up-arrow me-2" style={{ color: 'var(--gold)' }} />Weight Tracker</h2>
          <p>Log your weight and track your progress over time</p>
        </div>
      </div>

      <div className="wt-stats">
        {stat('Current', stats?.cur)}
        {stat('Starting', stats?.start)}
        {stat('Change', stats && `${stats.change > 0 ? '+' : ''}${stats.change}`, stats ? (stats.change < 0 ? 'positive' : stats.change > 0 ? 'negative' : '') : '')}
        {stat('Lowest', stats?.low)}
        {stat('Highest', stats?.high)}
        {stat('Entries', entries.length)}
      </div>

      <div className="wt-chart-card">
        <div className="wt-chart-toolbar">
          <span className="wt-chart-title">Progress</span>
          <div className="wt-toolbar-right">
            <div className="wt-toggle-group">
              {RANGES.map(([v, l]) => (
                <button key={v} className={`wt-toggle-btn${range === v ? ' active' : ''}`} onClick={() => setRange(v)}>{l}</button>
              ))}
            </div>
            <div className="wt-toggle-group">
              {['lbs', 'kg'].map((u) => (
                <button key={u} className={`wt-toggle-btn${unit === u ? ' active' : ''}`} onClick={() => setUnit(u)}>{u}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="wt-chart-wrap"><canvas ref={canvas} /></div>
      </div>

      <div className="wt-log-card">
        <div className="wt-log-title"><i className="bi bi-plus-circle me-2" style={{ color: 'var(--gold)' }} />Log Weight</div>
        <div className="wt-log-row">
          <div className="wt-field"><label className="form-label">Date</label>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          <div className="wt-field"><label className="form-label">Weight</label>
            <input type="number" className="form-control" placeholder="e.g. 185" min="50" max="700" step="0.1"
              value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
          <div className="wt-field" style={{ maxWidth: 120 }}><label className="form-label">Unit</label>
            <select className="form-select" value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
              <option value="lbs">lbs</option><option value="kg">kg</option>
            </select></div>
          <button className="wt-log-btn" onClick={save}><i className="bi bi-check2 me-1" /> Save</button>
        </div>
      </div>

      <div className="wt-history-card">
        <div className="wt-history-header">
          <span className="wt-history-title">History</span>
          <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Showing {visible.length} of {entries.length}</span>
        </div>
        {visible.length === 0 ? (
          <div className="wt-empty">No entries yet. Log your first weight above.</div>
        ) : (
          <table className="wt-history-table">
            <thead><tr><th>Date</th><th>Weight</th><th>Change</th><th /></tr></thead>
            <tbody>
              {[...visible].reverse().map((e) => {
                const d = deltaFor(e);
                return (
                  <tr key={e.date}>
                    <td>{e.date}</td>
                    <td>{conv(e.valueLbs)} {unit}</td>
                    <td>{d != null && d !== 0 && <span className={`wt-delta ${d > 0 ? 'up' : 'down'}`}>{d > 0 ? '+' : ''}{d}</span>}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="wt-delete-entry" title="Delete" onClick={() => remove(e.date)}><i className="bi bi-trash" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
