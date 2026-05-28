const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'categoria_id'
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imagemUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'imagem_url'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'produto',
  timestamps: false
});

module.exports = Produto;
