import React, { useState, useEffect } from 'react';

type Item = { id: number; text: string };

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Only fetch items if logged in
  useEffect(() => {
    if (token) {
      fetch('/items')
        .then(res => res.json())
        .then(setItems);
    }
  }, [token]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginUser, password: loginPass }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setToken(data.token || 'dummy-token'); // Use token if returned, else dummy
        } else {
          setLoginError(data.message || 'Login failed');
        }
      });
  }

  function addItem() {
    fetch('/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(item => setItems([...items, item]));
    setText('');
  }

  function startEdit(id: number, currentText: string) {
    setEditId(id);
    setEditText(currentText);
  }

  function saveEdit(id: number) {
    fetch(`/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    })
      .then(res => res.json())
      .then(updated => setItems(items.map(i => (i.id === id ? updated : i))));
    setEditId(null);
    setEditText('');
  }

  function cancelEdit() {
    setEditId(null);
    setEditText('');
  }

  function deleteItem(id: number) {
    fetch(`/items/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(i => i.id !== id)));
  }

  // Show login form if not logged in
  if (!token) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginUser}
          onChange={e => setLoginUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPass}
          onChange={e => setLoginPass(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
      </form>
    );
  }

  // Show todo list if logged in
  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item =>
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => saveEdit(item.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {item.text}
                <button onClick={() => startEdit(item.id, item.text)}>Edit</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}