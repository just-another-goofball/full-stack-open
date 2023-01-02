const express = require('express');
const morgan = require('morgan');

const app = express();

const DATA = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },
];

const generateId = () => {
  if (DATA.length === 0) {
    return 1;
  }

  return Math.max(...DATA.map(({name, number, id}) => id)) + 1;
};

morgan.token('request-body', (request) => {
  return JSON.stringify(request.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

app.get('/', (request, response) => {
  response.send('Hello, World!');
});

app.get('/api', (request, response) => {
  response.send('Welcome to the phonebook api!');
});

app.get('/info', (request, response) => {
  response.send(`Phonebook has info on ${DATA.length} people<br />${new Date()}`);
})

app.get('/api/persons', (request, response) => {
  response.json(DATA);
});

app.post('/api/persons', (request, response) => {
  const {name, number} = request.body;

  if (name && DATA.some((person) => name === person.name)) {
    response.status(400).json({error: 'name must be unique'});
  } else if (name && number) {
    DATA.push({
      name,
      number,
      id: generateId(),
    });
    response.json(DATA[DATA.length - 1]);
  } else {
    response.status(400).json({error: 'name or number is missing'});
  }
})

app.get('/api/persons/:id', (request, response) => {
  const requestedId = +request.params.id;
  const person = DATA.find(({name, number, id}) => id === requestedId);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const requestedId = +request.params.id;
  const index = DATA.findIndex(({name, number, id}) => id === requestedId);

  DATA.splice(index, 1);

  response.status(204).end();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening at ${PORT}...`);
});
