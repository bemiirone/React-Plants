const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;
const plantsData = JSON.parse(fs.readFileSync('./data/plants.json'));
const plants = plantsData.data;
const UserData = JSON.parse(fs.readFileSync('./data/users.json'));
const users = UserData.data;

// Plants routes

const validatePlant = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('family').isLength({ min: 1 }).withMessage('Family is required'),
  check('year')
    .isInt({ min: 1 })
    .withMessage('Year must be a positive integer'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4000' }));

app.get('/plants', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : plants.length;
  const offset = parseInt(req.query.offset) || 0;

  const paginatedPlants = plants.slice(offset, offset + limit);
  res.json(paginatedPlants);
});

app.get('/plants/:id', (req, res) => {
  const plant = plants.find((p) => p.id === parseInt(req.params.id));
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).send('Plant not found');
  }
});

app.post('/plants', validatePlant, handleValidationErrors, (req, res) => {
  const newPlant = req.body;
  const existingPlant = plants.find((p) => p.id === newPlant.id);
  const maxId = Math.max(...plants.map((p) => p.id));
  newPlant.id = maxId + 1;

  if (existingPlant) {
    return res.status(400).send('A plant with the same ID already exists');
  }

  plants.push(newPlant);
  res.status(201).json(newPlant);
});

app.put('/plants/:id', validatePlant, handleValidationErrors, (req, res) => {
  const plant = plants.find((p) => p.id === parseInt(req.params.id));
  if (plant) {
    Object.assign(plant, req.body);
    res.json(plant);
  } else {
    res.status(404).send('Plant not found');
  }
});

app.delete('/plants/:id', (req, res) => {
  const index = plants.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    plants.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Plant not found');
  }
});

// Users routes
app.get('/users', (req, res) => {
  if (users.length === 0) {
    res.status(500).send({ error: 'Failed to load users' });
    return;
  }
  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
