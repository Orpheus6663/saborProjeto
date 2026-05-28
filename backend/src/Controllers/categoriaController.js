const { Categoria } = require('../Models');

async function listarCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll({
      order: [['nome', 'ASC']]
    });

    return res.json(categorias.map((categoria) => categoria.nome));
  } catch (erro) {
    console.error('Erro ao listar categorias:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function cadastrarCategoria(req, res) {
  try {
    const { nome } = req.body || {};

    if (!nome) {
      return res.status(400).json({ mensagem: 'Nome da categoria e obrigatorio.' });
    }

    const [categoria, criada] = await Categoria.findOrCreate({
      where: { nome }
    });

    return res.status(criada ? 201 : 200).json(categoria);
  } catch (erro) {
    console.error('Erro ao cadastrar categoria:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  listarCategorias,
  cadastrarCategoria
};
