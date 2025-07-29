import { Router } from 'express';

const router = Router();
let items = [{ id: 1, text: 'Sample Item' }];

router.get('/', (req, res) => res.json(items));
router.post('/', (req, res) => {
  const { text } = req.body;
  const newItem = { id: items.length + 1, text };
  items.push(newItem);
  res.status(201).json(newItem);
});
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  item.text = req.body.text;
  res.json(item);
});
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

export { router as itemsRouter };