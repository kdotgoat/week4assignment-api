const express = require('express');
const router = express.Router();

let expenses = [];

// GET /api/expenses: Retrieve all expenses
router.get('/', (req, res) => {
  res.json(expenses);
});

// POST /api/expenses: Add a new expense
router.post('/', (req, res) => {
  const expense = {
    id: expenses.length + 1,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date
  };
  expenses.push(expense);
  res.status(201).json(expense);
});

// PUT /api/expenses/:id: Update an existing expense
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expense = expenses.find(e => e.id === id);
  
  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expense.description = req.body.description;
  expense.amount = req.body.amount;
  expense.date = req.body.date;

  res.json(expense);
});

// DELETE /api/expenses/:id: Delete an existing expense
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = expenses.findIndex(e => e.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expenses.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
