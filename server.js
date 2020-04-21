const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/items');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/toda'
)

const app = express();

app.use('/api/v1/items', items)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));