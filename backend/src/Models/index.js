const Usuario = require('./user');
const Categoria = require('./category');
const Produto = require('./product');
const Pedido = require('./order');
const ItemPedido = require('./orderItem');
const Contato = require('./contact');

Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

Usuario.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Usuario, { foreignKey: 'clienteId' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId', as: 'itens' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Produto.hasMany(ItemPedido, { foreignKey: 'produtoId' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = {
  Usuario,
  Categoria,
  Produto,
  Pedido,
  ItemPedido,
  Contato
};
