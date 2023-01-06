const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const Record = require('./models/record');

const app = express();


/*** MIDDLEWARE ***/
morgan.token('request-body', (request) => {
  return JSON.stringify(request.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'));

/*** ENDPOINTS ***/
app.get('/api', (request, response) => {
  response.send('Welcome to the phonebook api!');
});

app.get('/api/persons', (request, response) => {
  Record.find({})
    .then((result) => {
      response.json(result);
    });
});

app.post('/api/persons', (request, response, next) => {
  const {name, number} = request.body;

  if (name && number) {
    Record.find({ name })
      .then((result) => {
        if (result) {
          next({ message: `Record for (${name}) already exists in the phonebook!` });
        } else {
          const newRecord = new Record({ name, number });
          newRecord.save()
            .then((result) => {
              response.json(result);
            }).catch(error => {
              next(error);
            });
        }
      });
  } else {
    response.status(400).json({error: 'name or number is missing'});
  }
});

app.get('/api/persons/:id', (request, response, next) => {
  Record.findById(request.params.id)
    .then((record) => {
      if (record) {
        response.json(record);
      } else {
        response.status(404).end();
      }
    }).catch((error) => {
      next(error);
    });
});

app.put('/api/persons/:id', (request, response, next) => {
  const updatedRecord = {
    name: request.body.name,
    number: request.body.number,
  };

  Record.findByIdAndUpdate(
    request.params.id, updatedRecord, 
    { new: true, context: 'query', runValidators: true }
  )
    .then((result) => {
      response.json(result);
    }).catch((error) => {
      next(error);
    });
});

app.delete('/api/persons/:id', (request, response, next) => {
  Record.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    }).catch((error) => {
      next(error);
    });
});

/*** MORE MIDDLEWARE ***/
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint!\nMake sure the URL you entered is correct.' });
};

const errorHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformed ID' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: `Invalid name or number: ${error.message}`});
  } else {
    response.status(400).send({ error: `${error.message}` });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

/*** SERVE ***/
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`listening at ${PORT}...`);
});
