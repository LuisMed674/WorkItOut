export const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const pad = (n) => String(n).padStart(2, '0');
export const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const mondayOf = (d) => addDays(d, -((d.getDay() + 6) % 7));
export const todayStr = () => fmt(new Date());
export const short = (d) => `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
export const weeksOfMonth = (y, m) => {
  const out = [], end = new Date(y, m + 1, 0);
  for (let s = mondayOf(new Date(y, m, 1)); s <= end; s = addDays(s, 7)) out.push(s);
  return out;
};
