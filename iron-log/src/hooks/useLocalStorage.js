import { useEffect, useState } from 'react';

// useState that persists to localStorage. `normalize` runs once on the loaded value.
export default function useLocalStorage(key, initial, normalize = (v) => v) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return normalize(raw ? JSON.parse(raw) : initial);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('Could not save', key, e); }
  }, [key, value]);
  return [value, setValue];
}
