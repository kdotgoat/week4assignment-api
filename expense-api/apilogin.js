const express = require('express');  
const bcrypt = require('bcrypt');  
const app = express();  
  
 
const users = [  
  { id: 1, username: 'johnDoe', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEaVIh4eRAoBTO7C9f3d2Hb8KjCm' },  
  { id: 2, username: 'janeDoe', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEaVIh4eRAoBTO7C9f3d2Hb8KjCm' },  
];  
  

app.use(express.json());  
  

app.post('/api/auth/login', (req, res) => {  
  const { username, password } = req.body;  
  
  
  const user = users.find((user) => user.username === username);  
  
  if (!user) {  
  return res.status(401).json({ error: 'Invalid username or password' });  
  }  
  
  
  bcrypt.compare(password, user.password, (err, isValid) => {  
  if (err) {  
 return res.status(500).json({ error: 'Internal Server Error' });  
 }  
  
  if (!isValid) {  
 return res.status(401).json({ error: 'Invalid username or password' });  
  }  
  
 
  const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, {  
    expiresIn: '1h',  
  });  
  
 res.json({ token });  
  });  
});  
  
app.listen(3000, () => {  
  console.log('Server listening on port 3000');  
});
