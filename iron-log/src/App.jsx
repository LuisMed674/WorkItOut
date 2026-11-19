import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import useLocalStorage from './hooks/useLocalStorage';
import { fmt, mondayOf } from './lib/dates';
import Sidebar from './components/Sidebar';
import DayView from './components/DayView';
import CatalogPage from './components/CatalogPage';
import WeightPage from './components/WeightPage';
import WorkoutModal from './components/WorkoutModal';

const Brand = ({ size = 17 }) => (
  <><i className="bi bi-lightning-fill" style={{ fontSize: size, verticalAlign: 'middle', marginRight: 4 }} />IRON LOG</>
);

// Storage shapes (same keys as the original app):
//   ironlog_v1        { 'YYYY-MM-DD': [ { id, name, muscle, sets: [ { reps, weight } ] } ] }
//   ironlog_weight_v1 [ { date, valueLbs } ]   (sorted by date)
const addIds = (data) => {
  const out = {};
  for (const [d, list] of Object.entries(data || {}))
    out[d] = list.map((w) => ({ ...w, id: w.id ?? crypto.randomUUID() }));
  return out;
};

export default function App() {
  const [workouts, setWorkouts] = useLocalStorage('ironlog_v1', {}, addIds);
  const [weights, setWeights] = useLocalStorage('ironlog_weight_v1', []);
  const [view, setView] = useState('log'); // 'log' | 'catalog' | 'weight'
  const [weekStart, setWeekStart] = useState(fmt(mondayOf(new Date())));
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState({ show: false, dateStr: null, workout: null });

  const go = (v) => { setView(v); setMenuOpen(false); };
  const closeModal = () => setModal((m) => ({ ...m, show: false }));

  const saveWorkout = (dateStr, existing, data) => {
    const list = workouts[dateStr] || [];
    const next = existing
      ? list.map((w) => (w.id === existing.id ? { ...w, ...data } : w))
      : [...list, { id: crypto.randomUUID(), ...data }];
    setWorkouts({ ...workouts, [dateStr]: next });
    closeModal();
  };

  const deleteWorkout = (dateStr, w) => {
    if (!window.confirm(`Delete "${w.name}"?`)) return;
    const { [dateStr]: list, ...rest } = workouts;
    const next = list.filter((x) => x.id !== w.id);
    setWorkouts(next.length ? { ...rest, [dateStr]: next } : rest);
  };

  const sidebar = (
    <Sidebar weekStart={weekStart} workouts={workouts}
      onSelectWeek={(w) => { setWeekStart(w); go('log'); }}
      onOpenCatalog={() => go('catalog')} onOpenWeight={() => go('weight')} />
  );

  return (
    <>
      <div className="mobile-topbar">
        <span className="brand-name"><Brand /></span>
        <button className="hamburger-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu"><i className="bi bi-list" /></button>
      </div>

      <Offcanvas show={menuOpen} onHide={() => setMenuOpen(false)} placement="start">
        <Offcanvas.Header closeButton><Offcanvas.Title><Brand /></Offcanvas.Title></Offcanvas.Header>
        <Offcanvas.Body>{sidebar}</Offcanvas.Body>
      </Offcanvas>

      <div id="app">
        <nav id="sidebar">
          <div className="sidebar-brand">
            <h1><Brand size={20} /></h1>
            <span>Your private workout tracker</span>
          </div>
          {sidebar}
        </nav>

        {view === 'log' && (
          <DayView weekStart={weekStart} workouts={workouts}
            onLog={(dateStr) => setModal({ show: true, dateStr, workout: null })}
            onEdit={(dateStr, workout) => setModal({ show: true, dateStr, workout })}
            onDelete={deleteWorkout} />
        )}
        {view === 'catalog' && <CatalogPage onBack={() => go('log')} />}
        {view === 'weight' && <WeightPage entries={weights} setEntries={setWeights} onBack={() => go('log')} />}
      </div>

      <WorkoutModal {...modal} onClose={closeModal} onSave={saveWorkout} />
    </>
  );
}
