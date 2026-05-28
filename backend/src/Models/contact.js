const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Contato = sequelize.define('Contato', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assunto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  destinatario: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'giovannasilva111222@gmail.com'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'novo'
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'contato',
  timestamps: false
});

module.exports = Contato;
