const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Define storage file
const storageFile = 'data.json';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Load existing data
let data = {};
fs.existsSync(storageFile) && (data = JSON.parse(fs.readFileSync(storageFile)));

// API endpoints

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(data);
});

// Create new task
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  data.push(newTask);
  fs.writeFileSync(storageFile, JSON.stringify(data));
  res.json(newTask);
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;
  data = data.map((task) => (task.id === id ? updatedTask : task));
  fs.writeFileSync(storageFile, JSON.stringify(data));
  res.json(updatedTask);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  data = data.filter((task) => task.id !== id);
  fs.writeFileSync(storageFile, JSON.stringify(data));
  res.json({ message: 'Task deleted' });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

