const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tg-angular-abstract-mongo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define the Belonging model
const Belonging = mongoose.model('Belonging', { name: String });

// Routes
app.get('/api/belongings', async (req, res) => {
  const belongings = await Belonging.find();
  res.json(belongings);
});

app.post('/api/belongings', async (req, res) => {
  const belonging = new Belonging(req.body);
  await belonging.save();
  res.status(201).json(belonging);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection', reason);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
