const express = require('express');
const helmet = require('helmet');

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()
const router = require('./routes/sslcommerz')

// parse application/x-www-form-urlencoded
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(cors())
app.use(cors({
  origin: "*",
}));
// parse application/json
app.use(bodyParser.json());
app.use(helmet({ crossOriginResourcePolicy: false }))

// home route
app.get('/', async (req, res) => {
  return res.status(200).json({
    message: "Welcome to sslcommerz app",

  })
})

app.use('/', router);

//db connection
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
