const express = require('express');


const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const router = require('./routes/sslcommerz')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
// parse application/json
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  return res.status(200).json({
    message: "Welcome to sslcommerz app",

  })
})

app.use('/', router);

app.listen(process.env.PORT, () =>
  console.log(`ssl app listening on port ${process.env.PORT}!`),
);
