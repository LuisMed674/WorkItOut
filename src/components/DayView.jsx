import { useState } from 'react';
import { DAYS, MONTHS, fmt, parse, addDays, short, todayStr } from '../lib/dates';

function WorkoutEntry({ w, onEdit, onDelete }) {
  return (
    <div className="workout-entry">
      <div className="workout-entry-header">
        <span className="w-name">{w.name}</span>
        {w.muscle && <span className="w-muscle">{w.muscle}</span>}
        <div className="workout-action-btns">
          <button className="edit-workout-btn" title="Edit" onClick={() => onEdit(w)}><i className="bi bi-pencil" /></button>
          <button className="delete-workout-btn" title="Delete" onClick={() => onDelete(w)}><i className="bi bi-trash" /></button>
        </div>
      </div>
      {w.sets.length > 0 && (
        <table className="sets-table">
          <thead><tr><th>Set</th><th>Reps</th><th>Weight</th></tr></thead>
          <tbody>
            {w.sets.map((s, i) => (
              <tr key={s.id ?? i}>
                <td className="set-num">{i + 1}</td>
                <td className="set-reps">{s.reps}</td>
                <td className={`set-weight${s.weight != null ? ' has-weight' : ''}`}>
                  {s.weight != null ? `${s.weight} lbs` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function DayView({ weekStart, workouts, onLog, onEdit, onDelete }) {
  const [open, setOpen] = useState({});
  const today = todayStr();
  const start = parse(weekStart);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));


  return (
    <main className="page">
      <div className="page-header">
        <div className="title-block">
          <h2>Week of {short(start)}</h2>
          <p>{short(start)} – {short(days[6])}, {days[6].getFullYear()}</p>
        </div>
      </div>

      {days.map((d) => {
        const ds = fmt(d);
        const list = workouts[ds] || [];
        const isToday = ds === today;
        const isOpen = open[ds] ?? isToday;
        const muscles = [...new Set(list.map((w) => w.muscle).filter(Boolean))];
        return (
          <div key={ds} className={`day-card${isToday ? ' today' : ''}`}>
            <div className="day-card-header" onClick={() => setOpen({ ...open, [ds]: !isOpen })}>
              <div className="day-num">{d.getDate()}</div>
              <div className="day-label">
                <div className="name">{isToday && <span className="today-dot" />}{DAYS[d.getDay()]}</div>
                <div className="sub">{MONTHS[d.getMonth()]} {d.getDate()}
                  {list.length > 0 && ` · ${list.length} workout${list.length > 1 ? 's' : ''}`}</div>
              </div>
              <div className="day-pill-group">{muscles.map((m) => <span key={m} className="muscle-pill">{m}</span>)}</div>
              <button className={`day-toggle-btn${isOpen ? ' open' : ''}`}><i className="bi bi-plus-lg" /></button>
            </div>
            {isOpen && (
              <div className="day-body">
                {list.length === 0 && <div className="empty-day">No workouts logged.</div>}
                {list.map((w) => <WorkoutEntry key={w.id} w={w} onEdit={(x) => onEdit(ds, x)} onDelete={(x) => onDelete(ds, x)} />)}
                <button className="log-btn" onClick={() => onLog(ds)}>
                  <i className="bi bi-plus-lg me-1" /> Log Workout
                </button>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
