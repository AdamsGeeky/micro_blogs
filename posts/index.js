const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const posts = {};

// welcome route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the posts service' });
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async(req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  // Emit an event published to the event bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(posts[id]);
});

// Receive events from the event bus
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  res.send({ status: 'OK' });
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});