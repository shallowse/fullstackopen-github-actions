const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

morgan.token('postputdata', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body);
  }
  return ' ';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postputdata'));

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

let anecdotes = [
  {
    content: 'If it hurts, do it more often',
    id: '7a004edd-7ed5-420a-9065-b0c1780bde31',
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: 'd354c88c-bec6-433a-bd15-bdd542c7ebd7',
    votes: 0
  },
  {
    content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    id: '76198c3f-fb98-44d9-8237-6272461f1c52',
    votes: 0
  },
  {
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id: '0fe78caf-7dbf-4bbe-9f55-5b17d851330f',
    votes: 0
  },
  {
    content: 'Premature optimization is the root of all evil.',
    id: '5a71ec53-9e43-4487-a35e-a6a89d4780e3',
    votes: 0
  },
  {
    content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    id: '9c5de53b-0b16-45b8-b950-b6de946a76a6',
    votes: 0
  }
];

app.get('/anecdotes', (_req, res) => {
  res.json(anecdotes);
});

app.get('/anecdotes/:id', (req, res) => {
  const id = req.params.id;
  const anecdote = anecdotes.find(x => x.id === id);
  if (anecdote === undefined) {
    return res.status(401).json({ error: 'not found' });
  }
  res.json(anecdote);
});

app.post('/anecdotes', (req, res) => {
  const body = req.body;
  const newAnecdote = {
    ...body,
    id: uuidv4(),
  };
  anecdotes = [...anecdotes, newAnecdote];
  res.json(newAnecdote);
});

app.put('/anecdotes/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const foundAnecdote = anecdotes.find(anecdote => anecdote.id === id);
  if (foundAnecdote === undefined) {
    return res.status(401).json({ error: 'anecdote to update was not found' });
  }

  const updateAnecdote = {
    ...foundAnecdote,
    ...body,
  };

  anecdotes = anecdotes.map(anecdote => anecdote.id !== id ? anecdote : updateAnecdote);
  res.json(updateAnecdote);
});

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.get('/version', (_req, res) => {
  res.send('4');
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
