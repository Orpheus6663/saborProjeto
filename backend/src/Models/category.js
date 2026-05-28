const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

module.exports = Categoria;
