const { Op } = require('sequelize');
const { Categoria, Produto } = require('../Models');
const { formatarProduto } = require('../Utils/formatadores');

async function listarProdutos(req, res) {
  try {
    const { busca, categoria } = req.query;
    const filtro = { ativo: true };
    const categoriaInclude = { model: Categoria, as: 'categoria' };

    if (busca) {
      filtro.nome = { [Op.like]: `%${busca}%` };
    }

    if (categoria) {
      categoriaInclude.where = { nome: categoria };
    }

    const produtos = await Produto.findAll({
      where: filtro,
      include: [categoriaInclude],
      order: [['nome', 'ASC']]
    });

    return res.json(produtos.map(formatarProduto));
  } catch (erro) {
    console.error('Erro ao listar produtos:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function buscarProdutoPorId(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });

    if (!produto || !produto.ativo) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado.' });
    }

    return res.json(formatarProduto(produto));
  } catch (erro) {
    console.error('Erro ao buscar produto:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function cadastrarProduto(req, res) {
  try {
    const { nome, descricao, categoria, preco, estoque, imagemUrl } = req.body || {};
    const precoNumero = Number(preco);
    const estoqueNumero = Number(estoque);

    if (!nome || !descricao || !categoria || preco === undefined || estoque === undefined) {
      return res.status(400).json({ mensagem: 'Preencha nome, descricao, categoria, preco e estoque.' });
    }

    if (Number.isNaN(precoNumero) || Number.isNaN(estoqueNumero) || precoNumero <= 0 || estoqueNumero < 0) {
      return res.status(400).json({ mensagem: 'Preco e estoque precisam ser validos.' });
    }

    const [categoriaProduto] = await Categoria.findOrCreate({
      where: { nome: categoria }
    });

    const produto = await Produto.create({
      nome,
      descricao,
      categoriaId: categoriaProduto.id,
      preco: precoNumero,
      estoque: estoqueNumero,
      imagemUrl
    });

    const produtoComCategoria = await Produto.findByPk(produto.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });

    return res.status(201).json(formatarProduto(produtoComCategoria));
  } catch (erro) {
    console.error('Erro ao cadastrar produto:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function atualizarProduto(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado.' });
    }

    const { nome, descricao, categoria, preco, estoque, imagemUrl, ativo } = req.body || {};
    let categoriaId = produto.categoriaId;
    let precoFinal = produto.preco;
    let estoqueFinal = produto.estoque;

    if (categoria) {
      const [categoriaProduto] = await Categoria.findOrCreate({
        where: { nome: categoria }
      });
      categoriaId = categoriaProduto.id;
    }

    if (preco !== undefined) {
      precoFinal = Number(preco);
    }

    if (estoque !== undefined) {
      estoqueFinal = Number(estoque);
    }

    if (Number.isNaN(precoFinal) || Number.isNaN(estoqueFinal) || precoFinal <= 0 || estoqueFinal < 0) {
      return res.status(400).json({ mensagem: 'Preco e estoque precisam ser validos.' });
    }

    await produto.update({
      nome: nome ?? produto.nome,
      descricao: descricao ?? produto.descricao,
      categoriaId,
      preco: precoFinal,
      estoque: estoqueFinal,
      imagemUrl: imagemUrl ?? produto.imagemUrl,
      ativo: ativo ?? produto.ativo
    });

    const produtoComCategoria = await Produto.findByPk(produto.id, {
      include: [{ model: Categoria, as: 'categoria' }]
    });

    return res.json(formatarProduto(produtoComCategoria));
  } catch (erro) {
    console.error('Erro ao atualizar produto:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function removerProduto(req, res) {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto nao encontrado.' });
    }

    await produto.update({ ativo: false });

    return res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (erro) {
    console.error('Erro ao remover produto:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  cadastrarProduto,
  atualizarProduto,
  removerProduto
};
