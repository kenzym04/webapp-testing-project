import React, { useState, useEffect } from 'react';

type Item = { id: number; text: string };

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetch('/items').then(res => res.json()).then(setItems);
  }, []);

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