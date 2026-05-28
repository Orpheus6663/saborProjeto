function formatarProduto(produto) {
  return {
    id: produto.id,
    nome: produto.nome,
    descricao: produto.descricao,
    categoria: produto.categoria ? produto.categoria.nome : null,
    categoriaId: produto.categoriaId,
    preco: Number(produto.preco),
    estoque: produto.estoque,
    imagemUrl: produto.imagemUrl,
    ativo: produto.ativo
  };
}

function formatarUsuario(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  };
}

module.exports = {
  formatarProduto,
  formatarUsuario
};
