const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sequelize instance with an in-memory database
const sequelize = new Sequelize('sqlite::memory:');

// Introduction database Schema
const Introduction = sequelize.define('Introduction', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hobby: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favouriteFood: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Syncing schema with database
sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
});

// APIs POST, GET, PUT, DELETE
app.get('/api/introductions', async (req, res) => {
  const introductions = await Introduction.findAll();
  res.json(introductions);
});

app.post('/api/introductions', async (req, res) => {
  const newIntroduction = await Introduction.create(req.body);
  res.json(newIntroduction);
});

app.put('/api/introductions/:id', async (req, res) => {
  const { id } = req.params;
  await Introduction.update(req.body, { where: { id } });
  const updatedIntroduction = await Introduction.findByPk(id);
  res.json(updatedIntroduction);
});

app.delete('/api/introductions/:id', async (req, res) => {
  const { id } = req.params;
  await Introduction.destroy({ where: { id } });
  res.json({ message: 'Introduction deleted successfully' });
});

// Server initialization
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});