import React, { useState, useEffect } from 'react';

const API = 'http://localhost:3000/bookies';


const STORAGE_KEY = 'bookies_data';

const defaultBookies = [
  { id: '1', name: 'SBOBET', description: 'High Asian Handicap limits • Winners welcome', isLoggedIn: false },
  { id: '2', name: 'Pinnacle', description: 'Min $1–$2, high dynamic limits peaking near kickoff', isLoggedIn: false },
];

export default function BookMakerForm() {
  const [bookies, setBookies] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [editingId, setEditingId] = useState(null);

  const saveLocal = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setBookies(list);
  };

  // GET
  useEffect(() => {
    fetch(API)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setBookies)
      .catch(() => {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        setBookies(saved || defaultBookies);
      });
  }, []);

  // POST
  const addBookie = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newItem = { id: Date.now().toString(), name, description: desc, isLoggedIn: false };

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error();
      setBookies([...bookies, await res.json()]);
    } catch {
      saveLocal([...bookies, newItem]);
    }
    setName('');
    setDesc('');
  };

  
  const patchBookie = async (id, updates) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setBookies(bookies.map((b) => (b.id === id ? updated : b)));
    } catch {
      saveLocal(bookies.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    }
    setEditingId(null);
  };

  // DELETE
  const deleteBookie = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setBookies(bookies.filter((b) => b.id !== id));
    } catch {
      saveLocal(bookies.filter((b) => b.id !== id));
    }
  };

  return (
    <div style={styles.card}>
      <form onSubmit={addBookie} style={styles.form}>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bookie (e.g. PINNACLE)"
          required
        />
        <input
          style={{ ...styles.input, flex: 1 }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Limits / Notes (e.g. HIGH)"
        />
        <button type="submit" style={styles.addBtn}>Add</button>
      </form>

      {bookies.map((b) => (
        <div key={b.id} style={styles.row}>
          <div>
            {editingId === b.id ? (
              <input
                style={styles.input}
                defaultValue={b.description}
                onBlur={(e) => patchBookie(b.id, { description: e.target.value })}
                autoFocus
              />
            ) : (
              <>
                <div style={styles.title}>{b.name}</div>
                <div style={styles.desc} onClick={() => setEditingId(b.id)} title="Click to edit">
                  {b.description || 'Click to add note'}
                </div>
              </>
            )}
            <button
              type="button"
              onClick={() => patchBookie(b.id, { isLoggedIn: !b.isLoggedIn })}
              style={b.isLoggedIn ? styles.connectedBtn : styles.loginBtn}
            >
              {b.isLoggedIn ? 'Connected' : 'Login'}
            </button>
          </div>

          <button type="button" onClick={() => deleteBookie(b.id)} style={styles.delBtn}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: { background: '#0d111a', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px', maxWidth: '540px', color: '#fff' },
  form: { display: 'flex', gap: '8px', marginBottom: '20px' },
  input: { background: '#141923', border: '1px solid #334155', borderRadius: '6px', padding: '8px 12px', color: '#fff', fontSize: '13px', outline: 'none' },
  addBtn: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: '600', cursor: 'pointer' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderTop: '1px solid #1e293b' },
  title: { fontWeight: '700', fontSize: '14px' },
  desc: { color: '#94a3b8', fontSize: '12px', marginTop: '2px', cursor: 'pointer' },
  loginBtn: { marginTop: '10px', width: '200px', background: '#161c28', border: '1px solid #334155', color: '#cbd5e1', borderRadius: '6px', padding: '6px', fontSize: '12px', cursor: 'pointer' },
  connectedBtn: { marginTop: '10px', width: '200px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.4)', color: '#6ee7b7', borderRadius: '6px', padding: '6px', fontSize: '12px', cursor: 'pointer' },
  delBtn: { background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', color: '#fb7185', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
};

