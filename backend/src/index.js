const express = require('express');
const userRoutes = require('./userRoutes.js')

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://remindemy.vercel.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', (req, res) => {
	res.send("<h2>Hello world!</h2>");
});

app.use('/users', userRoutes)

app.listen(PORT, () => {
  console.log('API is listening on port ', PORT);
});

module.exports = app