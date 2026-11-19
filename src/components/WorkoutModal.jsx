import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { MUSCLE_OPTIONS } from '../data/catalog';

const blank = () => ({ reps: '', weight: '' });

// `workout` = existing workout when editing, null when logging a new one.
export default function WorkoutModal({ show, dateStr, workout, onClose, onSave }) {
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState('');
  const [sets, setSets] = useState([blank()]);

  useEffect(() => {
    if (!show) return;
    setName(workout?.name ?? '');
    setMuscle(workout?.muscle ?? '');
    setSets(workout?.sets.length
      ? workout.sets.map((s) => ({ reps: String(s.reps), weight: s.weight ?? '' }))
      : [blank()]);
  }, [show, workout]);

  const setField = (i, k, v) => setSets(sets.map((s, j) => (j === i ? { ...s, [k]: v } : s)));

  const save = () => {
    if (!name.trim()) return alert('Please enter a workout name.');
    const clean = sets
      .filter((s) => s.reps !== '' || s.weight !== '')
      .map((s) => ({ reps: parseInt(s.reps, 10) || 1, weight: s.weight === '' ? null : Number(s.weight) }));
    onSave(dateStr, workout, { name: name.trim(), muscle, sets: clean });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>{workout ? 'Edit Workout' : 'Log Workout'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          <div className="col-md-7">
            <label className="form-label">Workout Name</label>
            <input className="form-control" placeholder="e.g. Barbell Back Squat" value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="col-md-5">
            <label className="form-label">Target Muscle Group</label>
            <select className="form-select" value={muscle} onChange={(e) => setMuscle(e.target.value)}>
              <option value="">Select…</option>
              {MUSCLE_OPTIONS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <hr style={{ borderColor: 'var(--border)', margin: '20px 0 14px' }} />
        <div className="d-flex align-items-center justify-content-between mb-2">
          <label className="form-label mb-0">Sets</label>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>Reps · Weight (optional)</span>
        </div>
        <div className="mt-1">
          {sets.map((s, i) => (
            <div className="set-row" key={i}>
              <span className="set-row-num">{i + 1}</span>
              <input type="number" min="1" className="form-control" placeholder="Reps" value={s.reps}
                onChange={(e) => setField(i, 'reps', e.target.value)} />
              <input type="number" min="0" step="0.5" className="form-control" placeholder="lbs" value={s.weight}
                onChange={(e) => setField(i, 'weight', e.target.value)} />
              <button className="remove-set-btn" title="Remove set" onClick={() => setSets(sets.filter((_, j) => j !== i))}>
                <i className="bi bi-x-lg" />
              </button>
            </div>
          ))}
        </div>
        <button className="add-set-btn" onClick={() => setSets([...sets, blank()])}>
          <i className="bi bi-plus-lg me-1" /> Add Set
        </button>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn-gold" onClick={save}>
          <i className="bi bi-check2 me-1" /> Save Workout
        </button>
      </Modal.Footer>
    </Modal>
  );
}
