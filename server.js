const express = require('express');
const items = require('./routes/items');
const auth = require('./routes/auth');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/items', items);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})