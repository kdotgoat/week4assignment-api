const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

