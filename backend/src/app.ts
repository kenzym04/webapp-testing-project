import express from 'express';
import bodyParser from 'body-parser';
import { itemsRouter } from './routes/items';

const app = express();
app.use(bodyParser.json());

let users = [{ username: 'admin', password: 'password' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true });
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.use('/items', itemsRouter);

app.get('/', (req, res) => res.send('Welcome to the backend API!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

export default app;