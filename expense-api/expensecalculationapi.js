app.get('/api/expense', (req, res) => {  
     
    const userId = req.user.id;  
    const userExpenses = expenses.filter((expense) => expense.userId === userId);  
    
    
    const totalExpense = userExpenses.reduce((acc, expense) => acc + expense.amount, 0);  
    
    res.json({ totalExpense });  
  });
  