const { DataTypes } = require('sequelize');
const sequelize = require('./config');
const { Categoria, Produto } = require('../Models');

async function adicionarColunaSeNaoExistir(queryInterface, nomeTabela, nomeColuna, definicao) {
  const tabela = await queryInterface.describeTable(nomeTabela);

  if (!tabela[nomeColuna]) {
    await queryInterface.addColumn(nomeTabela, nomeColuna, definicao);
  }
}

async function garantirEstruturaDoBanco() {
  const queryInterface = sequelize.getQueryInterface();

  await adicionarColunaSeNaoExistir(queryInterface, 'cliente', 'senha', {
    type: DataTypes.STRING,
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'produto', 'descricao', {
    type: DataTypes.TEXT,
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'produto', 'imagem_url', {
    type: DataTypes.STRING,
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'produto', 'ativo', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'pedido', 'endereco', {
    type: DataTypes.STRING,
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'pedido', 'total', {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'pedido', 'status', {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'pendente'
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'item_pedido', 'nome_produto', {
    type: DataTypes.STRING,
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'item_pedido', 'preco_unitario', {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  });

  await adicionarColunaSeNaoExistir(queryInterface, 'item_pedido', 'subtotal', {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  });
}

async function cadastrarProdutosIniciais() {
  const categorias = {};
  const nomesCategorias = ['Colecionaveis', 'Pelucias', 'Menina', 'Meninos', 'Bebes'];

  for (const nome of nomesCategorias) {
    const [categoria] = await Categoria.findOrCreate({ where: { nome } });
    categorias[nome] = categoria;
  }

  const produtos = [
    ['Mini Brands', 'Mini marcas surpresa para colecionar.', 'Colecionaveis', 99.99, 20, '/assets/miniBrands.webp'],
    ['Geladeira Mini Brands', 'Geladeira para organizar sua colecao Mini Brands.', 'Colecionaveis', 349.90, 8, '/assets/geladeira.webp'],
    ['Pelucia Stitch', 'Pelucia macia do Stitch para decorar e brincar.', 'Pelucias', 119.90, 15, '/assets/pelcuiaStitch.jpg'],
    ['Pelucia Chopper', 'Pelucia fofa inspirada no Chopper.', 'Pelucias', 129.90, 12, '/assets/peluciaChopper.jpg'],
    ['Pelucia Gengar', 'Pelucia divertida para fas de Pokemon.', 'Pelucias', 139.90, 10, '/assets/peluciaGengar.jpg'],
    ['Pelucia Hipopotamo Interativo', 'Pelucia de hipopotamo bem macia.', 'Pelucias', 89.90, 14, '/assets/peluciaHipopotamo.jpg'],
    ['Pelucia Knuckles Superman', 'Pelucia do Knuckles para colecionar.', 'Pelucias', 119.90, 11, '/assets/peluciaKnuckles.jpg'],
    ['Pelucia My Melody', 'Pelucia delicada da My Melody.', 'Pelucias', 124.90, 16, '/assets/peluciaMymelody.jpg'],
    ['Pelucia Pancham', 'Pelucia pequena para brincar e colecionar.', 'Pelucias', 99.90, 13, '/assets/peluciaPancham.jpg'],
    ['Pelucia Shadow Batman', 'Pelucia do Shadow para fas de aventura.', 'Pelucias', 119.90, 9, '/assets/peluciaShadow.jpg'],
    ['Pelucia Zoro', 'Pelucia de personagem para presente.', 'Pelucias', 139.90, 8, '/assets/peluciaZoro.jpg'],
    ['Adopt Me Animais Surpresa', 'Boneca tematica para brincadeiras criativas.', 'Menina', 149.90, 10, '/assets/meninaAdoptme.jpg'],
    ['Cruzeiro da Gabby', 'Brinquedo da Gabby para criar historias.', 'Menina', 299.90, 7, '/assets/meninaCruzeirogabby.jpg'],
    ['Boneca LOL surprise Hairgoals', 'Boneca LOL com cabelo estiloso.', 'Menina', 169.90, 12, '/assets/meninaLolcabelo.webp'],
    ['Unicornio Encantado', 'Unicornio colorido para brincar e decorar.', 'Menina', 99.90, 14, '/assets/meninaUnicornio.jpg'],
    ['Castelo do Mario', 'Castelo tematico para aventuras e montagens.', 'Meninos', 249.90, 8, '/assets/meninosCastelomario.jpg'],
    ['Megazord', 'Robo articulado para brincar e colecionar.', 'Meninos', 219.90, 9, '/assets/meninosMegazord.jpg'],
    ['Moto de Corrida', 'Moto esportiva para brincadeiras de velocidade.', 'Meninos', 89.90, 14, '/assets/meninosMotocorrida.jpg'],
    ['Navio Going Merry de One Piece', 'Navio de aventura para fas de historias no mar.', 'Meninos', 189.90, 7, '/assets/meninosNavioamerry.jpg'],
    ['Ovo Dino Surpresa', 'Ovo surpresa com dinossauro para descobrir.', 'Meninos', 79.90, 16, '/assets/meninosOvodino.jpg'],
    ['Catapulta Como Treinar Seu Dragão', 'Brinquedo de dragao para criar batalhas e missoes.', 'Meninos', 159.90, 10, '/assets/meninosTreinardragão.jpg'],
    ['Veiculo Patrulha Canina - Chase', 'Veiculo resistente para brincadeiras cheias de acao.', 'Meninos', 119.90, 12, '/assets/meninosVeiculo.jpg'],
    ['Bloco de Atividades', 'Brinquedo educativo para bebes.', 'Bebes', 89.90, 18, '/assets/bebeBlocoatividades.jpg'],
    ['PeppaPig Carrinho - Susie', 'Carrinho infantil da Peppa para os pequenos.', 'Bebes', 119.90, 10, '/assets/bebeCarrinhopeppa.jpg'],
    ['Naninha Peppa', 'Naninha macia para aconchego.', 'Bebes', 69.90, 16, '/assets/bebeNaninhapeppa.jpg'],
    ['Quebra-cabeca Infantil', 'Quebra-cabeca simples para desenvolver raciocinio.', 'Bebes', 59.90, 15, '/assets/bebeQuebracabeca.jpg'],
    ['Tapete Infantil Com 2 Carrinhos', 'Tapete colorido para brincar com conforto.', 'Bebes', 189.90, 6, '/assets/bebeTapeteinfantil.jpg']
  ];

  for (const [nome, descricao, categoriaNome, preco, estoque, imagemUrl] of produtos) {
    const [produto] = await Produto.findOrCreate({
      where: { nome },
      defaults: {
        descricao,
        categoriaId: categorias[categoriaNome].id,
        preco,
        estoque,
        imagemUrl,
        ativo: true
      }
    });

    await produto.update({
      descricao,
      categoriaId: categorias[categoriaNome].id,
      preco,
      estoque,
      imagemUrl,
      ativo: true
    });
  }

  const nomesAtuais = produtos.map(([nome]) => nome);
  const imagensAtuais = [...new Set(produtos.map((produto) => produto[5]))];
  const produtosAntigosDuplicados = [
    'Geladeira - Mini Brands',
    'Pelucia Pomni',
    'Mini Geladeira',
    'Mini Brands Brinquedos',
    'Adopt Me Boneca',
    'LOL Cabelo',
    'Navio Going Merry',
    'Pelucia Hipopotamo',
    'Pelucia Knuckles',
    'Pelucia Shadow',
    'Carrinho Peppa',
    'Tapete Infantil',
    'Treinar Dragao',
    'Veiculo de Aventura'
  ];

  for (const nome of produtosAntigosDuplicados) {
    const produtoAntigo = await Produto.findOne({ where: { nome } });

    if (produtoAntigo) {
      await produtoAntigo.update({ ativo: false });
    }
  }

  for (const imagemUrl of imagensAtuais) {
    const produtosComMesmaImagem = await Produto.findAll({ where: { imagemUrl } });

    for (const produto of produtosComMesmaImagem) {
      if (!nomesAtuais.includes(produto.nome)) {
        await produto.update({ ativo: false });
      }
    }
  }
}

async function prepararBanco() {
  await sequelize.authenticate();
  await sequelize.sync();
  await garantirEstruturaDoBanco();
  await cadastrarProdutosIniciais();
}

module.exports = {
  prepararBanco
};
