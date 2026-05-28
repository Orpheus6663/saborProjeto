const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./Routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public/src')));
app.use(routes);

app.use((req, res) => {
  return res.status(404).json({ mensagem: 'Rota nao encontrada.' });
});

module.exports = app;
