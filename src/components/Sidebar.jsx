import { useState } from 'react';
import { MONTHS, fmt, parse, addDays, short, weeksOfMonth } from '../lib/dates';

// Shared by the desktop sidebar and the mobile offcanvas.
export default function Sidebar({ weekStart, workouts, onSelectWeek, onOpenCatalog, onOpenWeight }) {
  const year = new Date().getFullYear();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [openMonth, setOpenMonth] = useState(parse(weekStart).getMonth());
  const activeMonth = parse(weekStart).getMonth();

  const tools = [
    { icon: 'grid', label: 'Exercise Catalog', onClick: onOpenCatalog },
    { icon: 'graph-up-arrow', label: 'Weight Tracker', onClick: onOpenWeight },
    { icon: 'person-circle', label: 'About Me!', href: 'https://luismed674.github.io/personalWebsite/' },
    { icon: 'currency-dollar', label: 'Consider Supporting', href: 'https://account.venmo.com/u/LuisMedina674' },
  ];

  return (
    <div className="sidebar-body">
      <div className="sidebar-section">
        <div className={`month-header${toolsOpen ? ' open' : ''}`} onClick={() => setToolsOpen(!toolsOpen)}>
          <span><i className="bi bi-journal-bookmark me-2" />Additional Tools</span>
          <i className="bi bi-chevron-right chevron" />
        </div>
        {toolsOpen && (
          <div className="week-list">
            {tools.map((t) => (
              <div key={t.label} className="week-item" onClick={t.onClick}>
                <i className={`bi bi-${t.icon}`} style={{ fontSize: 12 }} />
                {t.href
                  ? <a href={t.href} target="_blank" rel="noopener noreferrer">{t.label}</a>
                  : <span>{t.label}</span>}
                <i className="bi bi-arrow-right arrow" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="month-nav">
        {MONTHS.map((name, m) => {
          const open = openMonth === m;
          return (
            <div key={name}>
              <div className={`month-header${open ? ' open' : ''}${m === activeMonth ? ' active' : ''}`}
                onClick={() => setOpenMonth(open ? null : m)}>
                <span>{name}</span><i className="bi bi-chevron-right chevron" />
              </div>
              {open && (
                <div className="week-list">
                  {weeksOfMonth(year, m).map((ws, i) => {
                    const key = fmt(ws);
                    let n = 0;
                    for (let d = 0; d < 7; d++) n += workouts[fmt(addDays(ws, d))]?.length || 0;
                    return (
                      <div key={key} className={`week-item${key === weekStart ? ' active' : ''}`}
                        onClick={() => onSelectWeek(key)}>
                        <span>Week {i + 1} · {short(ws)}–{short(addDays(ws, 6))}</span>
                        {n > 0 && <span className="week-badge">{n}</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
