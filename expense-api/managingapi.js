const express = require('express');  
const app = express();  
const expenses = [];  
  
// Middleware to parse JSON bodies  
app.use(express.json());  
  
// API endpoint to retrieve all expenses for a user  
app.get('/api/expenses', (req, res) => {  
  // Assume the user is authenticated and retrieve their expenses  
  const userId = req.user.id; // Replace with actual user ID from authentication  
  const userExpenses = expenses.filter((expense) => expense.userId === userId);  
  res.json(userExpenses);  
});  
  
// API endpoint to add a new expense for a user  
app.post('/api/expenses', (req, res) => {  
  const { description, amount, date } = req.body;  
  const newExpense = {  
   id: expenses.length + 1,  
   userId: req.user.id, // Replace with actual user ID from authentication  
   description,  
   amount,  
   date,  
  };  
  expenses.push(newExpense);  
  res.status(201).json(newExpense);  
});  
  
// API endpoint to update an existing expense  
app.put('/api/expenses/:id', (req, res) => {  
  const id = parseInt(req.params.id);  
  const { description, amount, date } = req.body;  
  const expense = expenses.find((expense) => expense.id === id);  
  if (!expense) {  
   return res.status(404).json({ error: 'Expense not found' });  
  }  
  expense.description = description;  
  expense.amount = amount;  
  expense.date = date;  
  res.json(expense);  
});  
  
// API endpoint to delete an existing expense  
app.delete('/api/expenses/:id', (req, res) => {  
  const id = parseInt(req.params.id);  
  const index = expenses.findIndex((expense) => expense.id === id);  
  if (index === -1) {  
   return res.status(404).json({ error: 'Expense not found' });  
  }  
  expenses.splice(index, 1);  
  res.status(204).json({ message: 'Expense deleted successfully' });  
});  
  
app.listen(3000, () => {  
  console.log('Server listening on port 3000');  
});
