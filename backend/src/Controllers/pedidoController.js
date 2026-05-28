const sequelize = require('../Database/config');
const { Usuario, Produto, Pedido, ItemPedido } = require('../Models');

async function criarPedido(req, res) {
  const transacao = await sequelize.transaction();

  try {
    const { endereco, itens } = req.body || {};

    if (!endereco || !Array.isArray(itens) || itens.length === 0) {
      await transacao.rollback();
      return res.status(400).json({ mensagem: 'Informe endereco e itens do pedido.' });
    }

    const usuario = await Usuario.findByPk(req.usuario.id, { transaction: transacao });

    if (!usuario) {
      await transacao.rollback();
      return res.status(404).json({ mensagem: 'Usuario nao encontrado.' });
    }

    let total = 0;
    const itensPedido = [];

    for (const item of itens) {
      const quantidade = Number(item.quantidade);

      if (!item.produtoId || !Number.isInteger(quantidade) || quantidade <= 0) {
        await transacao.rollback();
        return res.status(400).json({ mensagem: 'Itens do pedido invalidos.' });
      }

      const produto = await Produto.findByPk(item.produtoId, {
        transaction: transacao,
        lock: transacao.LOCK.UPDATE
      });

      if (!produto || !produto.ativo) {
        await transacao.rollback();
        return res.status(404).json({ mensagem: `Produto ${item.produtoId} nao encontrado.` });
      }

      if (produto.estoque < quantidade) {
        await transacao.rollback();
        return res.status(400).json({ mensagem: `Estoque insuficiente para ${produto.nome}.` });
      }

      const precoUnitario = Number(produto.preco);
      const subtotal = precoUnitario * quantidade;
      total += subtotal;

      await produto.update({ estoque: produto.estoque - quantidade }, { transaction: transacao });

      itensPedido.push({
        produtoId: produto.id,
        nomeProduto: produto.nome,
        quantidade,
        precoUnitario,
        subtotal
      });
    }

    const pedido = await Pedido.create({
      clienteId: usuario.id,
      endereco,
      total,
      status: 'pendente'
    }, { transaction: transacao });

    await ItemPedido.bulkCreate(
      itensPedido.map((item) => ({ ...item, pedidoId: pedido.id })),
      { transaction: transacao }
    );

    await transacao.commit();

    const pedidoCriado = await Pedido.findByPk(pedido.id, {
      include: [{ model: ItemPedido, as: 'itens' }]
    });

    return res.status(201).json(pedidoCriado);
  } catch (erro) {
    await transacao.rollback();
    console.error('Erro ao criar pedido:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function listarPedidosDoUsuario(req, res) {
  try {
    const pedidos = await Pedido.findAll({
      where: { clienteId: req.usuario.id },
      include: [{ model: ItemPedido, as: 'itens' }],
      order: [['data', 'DESC']]
    });

    return res.json(pedidos);
  } catch (erro) {
    console.error('Erro ao listar pedidos:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function buscarPedidoPorId(req, res) {
  try {
    const pedido = await Pedido.findOne({
      where: {
        id: req.params.id,
        clienteId: req.usuario.id
      },
      include: [{ model: ItemPedido, as: 'itens' }]
    });

    if (!pedido) {
      return res.status(404).json({ mensagem: 'Pedido nao encontrado.' });
    }

    return res.json(pedido);
  } catch (erro) {
    console.error('Erro ao buscar pedido:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  criarPedido,
  listarPedidosDoUsuario,
  buscarPedidoPorId
};
