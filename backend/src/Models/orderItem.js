const { DataTypes } = require('sequelize');
const sequelize = require('../Database/config');

const ItemPedido = sequelize.define('ItemPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'pedido_id'
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'produto_id'
  },
  nomeProduto: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'nome_produto'
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'quantidade'
  },
  precoUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'preco_unitario'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'item_pedido',
  timestamps: false
});

module.exports = ItemPedido;
