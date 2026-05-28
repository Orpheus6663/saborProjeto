const API_URL = "http://localhost:3000";
const imagensHover = {
  "/assets/miniBrands.webp": "/assets/miniBrandsBrinquedos.webp",
  "/assets/geladeira.webp": "/assets/geladeiraMinihover.webp",
  "/assets/bebeBlocoatividades.jpg": "/assets/bebeBlocoatividadesHover.jpg",
  "/assets/bebeCarrinhopeppa.jpg": "/assets/bebeCarrinhopeppaHover.jpg",
  "/assets/bebeNaninhapeppa.jpg": "/assets/bebeNaninhapeppaHover.jpg",
  "/assets/bebeQuebracabeca.jpg": "/assets/bebeQuebracabecaHover.jpg",
  "/assets/bebeTapeteinfantil.jpg": "/assets/bebeTapeteinfantilHover.jpg",
  "/assets/meninaAdoptme.jpg": "/assets/meninaAdoptmeHover.jpg",
  "/assets/meninaCruzeirogabby.jpg": "/assets/meninaCruzeirogabbyHover.jpg",
  "/assets/meninaLolcabelo.webp": "/assets/meninaLolcabeloHover.webp",
  "/assets/meninaUnicornio.jpg": "/assets/meninaUnicornioHover.jpg",
  "/assets/meninosCastelomario.jpg": "/assets/meninosCastelomarioHover.jpg",
  "/assets/meninosMegazord.jpg": "/assets/meninosMegazordHover.jpg",
  "/assets/meninosMotocorrida.jpg": "/assets/meninosMotocorridaHover.jpg",
  "/assets/meninosNavioamerry.jpg": "/assets/meninosNavioamerryHover.jpg",
  "/assets/meninosOvodino.jpg": "/assets/meninosOvodinoHover.jpg",
  "/assets/meninosTreinardragão.jpg": "/assets/meninosTreinardragãoHover.jpg",
  "/assets/meninosVeiculo.jpg": "/assets/meninosVeiculoHover.jpg",
  "/assets/pelcuiaStitch.jpg": "/assets/pelcuiaStitchHover.jpg",
  "/assets/peluciaChopper.jpg": "/assets/peluciaChopperHover.jpg",
  "/assets/peluciaGengar.jpg": "/assets/peluciaGengarHover.jpg",
  "/assets/peluciaHipopotamo.jpg": "/assets/peluciaHipopotamoHover.jpg",
  "/assets/peluciaKnuckles.jpg": "/assets/peluciaKnucklesHover.jpg",
  "/assets/peluciaMymelody.jpg": "/assets/PeluciaMymelodyHover.jpg",
  "/assets/peluciaPancham.jpg": "/assets/peluciaPanchamHover.jpg",
  "/assets/peluciaShadow.jpg": "/assets/peluciaShadowHover.jpg",
  "/assets/peluciaZoro.jpg": "/assets/peluciaZoroHover.jpg"
};

let index = 0;
const slides = document.querySelectorAll(".carousel img");
const busca = document.getElementById("busca");
const botao = document.getElementById("btnBuscar");
const carousel = document.getElementById("carousel");
const btnLogoHome = document.getElementById("btnLogoHome");
const listaProdutos = document.getElementById("listaProdutos");
const linksCategoria = document.querySelectorAll(".nav-link[data-categoria]");
const botoesMenu = document.querySelectorAll(".nav-link");
const btnContatoMenu = document.getElementById("btnContatoMenu");
const contatoSecao = document.getElementById("contatoSecao");
const formContato = document.getElementById("formContato");
const contatoNome = document.getElementById("contatoNome");
const contatoEmail = document.getElementById("contatoEmail");
const contatoAssunto = document.getElementById("contatoAssunto");
const contatoMensagem = document.getElementById("contatoMensagem");
const tituloProdutos = document.getElementById("tituloProdutos");
const btnCarrinho = document.getElementById("btnCarrinho");
const btnConta = document.getElementById("btnConta");
const btnFecharConta = document.getElementById("btnFecharConta");
const btnFecharCarrinho = document.getElementById("btnFecharCarrinho");
const btnFinalizarPedido = document.getElementById("btnFinalizarPedido");
const btnLimparCarrinho = document.getElementById("btnLimparCarrinho");
const btnFecharPagamento = document.getElementById("btnFecharPagamento");
const btnConfirmarPagamento = document.getElementById("btnConfirmarPagamento");
const carrinho = document.getElementById("carrinho");
const carrinhoFundo = document.getElementById("carrinhoFundo");
const conta = document.getElementById("conta");
const contaFundo = document.getElementById("contaFundo");
const pagamento = document.getElementById("pagamento");
const pagamentoFundo = document.getElementById("pagamentoFundo");
const resumoPagamento = document.getElementById("resumoPagamento");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const cepPedido = document.getElementById("cepPedido");
const enderecoPedido = document.getElementById("enderecoPedido");
const btnBuscarCep = document.getElementById("btnBuscarCep");
const metodoPagamento = document.getElementById("metodoPagamento");
const usuarioLogado = document.getElementById("usuarioLogado");
const abaEntrar = document.getElementById("abaEntrar");
const abaCadastrar = document.getElementById("abaCadastrar");
const formEntrar = document.getElementById("formEntrar");
const formCadastrar = document.getElementById("formCadastrar");
const loginEmail = document.getElementById("loginEmail");
const loginSenha = document.getElementById("loginSenha");
const cadastroNome = document.getElementById("cadastroNome");
const cadastroEmail = document.getElementById("cadastroEmail");
const cadastroSenha = document.getElementById("cadastroSenha");
const btnSair = document.getElementById("btnSair");

let produtosCarregados = [];
let carrinhoProdutos = JSON.parse(localStorage.getItem("carrinhoMundoEncantado")) || [];
let sessaoUsuario = JSON.parse(localStorage.getItem("sessaoMundoEncantado")) || null;
let categoriaAtual = "";

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 3000);

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function montarCaminhoImagem(produto) {
  if (!produto.imagemUrl) {
    return "./assets/logoMundoEncantado.png";
  }

  if (produto.imagemUrl.startsWith("http")) {
    return produto.imagemUrl;
  }

  return `.${produto.imagemUrl}`;
}

function montarImagemHover(produto) {
  const hover = imagensHover[produto.imagemUrl];
  return hover ? `.${hover}` : montarCaminhoImagem(produto);
}

function prepararHoverImagem(imagem) {
  const hover = imagem.dataset.hover;
  const original = imagem.dataset.original;

  if (hover && hover !== original) {
    const preload = new Image();
    preload.src = hover;
  }

  imagem.addEventListener("mouseenter", () => {
    imagem.style.opacity = "0.88";
    imagem.src = hover;
  });
  imagem.addEventListener("mouseleave", () => {
    imagem.src = original;
    imagem.style.opacity = "1";
  });
}

function esconderContato() {
  contatoSecao.classList.remove("aberto");
  document.querySelector(".container").style.display = "";
}

function renderizarProdutos(produtos) {
  produtosCarregados = produtos;
  listaProdutos.innerHTML = "";

  if (produtos.length === 0) {
    listaProdutos.innerHTML = '<p class="mensagem">Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img class="principal" src="${montarCaminhoImagem(produto)}" data-hover="${montarImagemHover(produto)}" data-original="${montarCaminhoImagem(produto)}" alt="${produto.nome}">
      <div class="card-body">
        <h5>${produto.nome}</h5>
        <p>${produto.descricao || "Produto Mundo Encantado"}</p>
        <p class="categoria">${produto.categoria || "Brinquedos"}</p>
        <p class="price">${formatarPreco(produto.preco)}</p>
        <p class="estoque">Estoque: ${produto.estoque}</p>
        <button type="button" onclick="comprarProduto(${produto.id})">Comprar</button>
      </div>
    `;

    listaProdutos.appendChild(card);

    prepararHoverImagem(card.querySelector("img"));
  });
}

async function carregarProdutos() {
  try {
    esconderContato();
    const termoBusca = busca.value.trim();
    const parametros = new URLSearchParams();

    if (termoBusca) {
      parametros.set("busca", termoBusca);
    }

    if (categoriaAtual) {
      parametros.set("categoria", categoriaAtual);
    }

    const queryString = parametros.toString() ? `?${parametros.toString()}` : "";

    if (termoBusca || categoriaAtual) {
      carousel.style.display = "none";
    } else {
      carousel.style.display = "";
    }

    const resposta = await fetch(`${API_URL}/produtos${queryString}`);

    if (!resposta.ok) {
      throw new Error("Erro ao carregar produtos.");
    }

    const produtos = await resposta.json();
    const estaNaHome = !termoBusca && !categoriaAtual;

    tituloProdutos.textContent = estaNaHome ? "Destaques da Home" : tituloProdutos.textContent;
    renderizarProdutos(estaNaHome ? produtos.slice(0, 4) : produtos);
  } catch (erro) {
    console.error(erro);
    listaProdutos.innerHTML = '<p class="mensagem">Nao foi possivel carregar os produtos. Veja se o backend esta rodando.</p>';
  }
}

function voltarParaHome() {
  categoriaAtual = "";
  busca.value = "";
  botoesMenu.forEach(link => {
    link.classList.toggle("ativo", link.dataset.categoria === "");
  });
  tituloProdutos.textContent = "Destaques da Home";
  carregarProdutos();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarContato() {
  categoriaAtual = "";
  busca.value = "";
  carousel.style.display = "none";
  document.querySelector(".container").style.display = "none";
  contatoSecao.classList.add("aberto");
  botoesMenu.forEach(link => link.classList.remove("ativo"));
  btnContatoMenu.classList.add("ativo");
  contatoSecao.scrollIntoView({ behavior: "smooth", block: "start" });
}

function filtrarPorCategoria(botaoCategoria) {
  categoriaAtual = botaoCategoria.dataset.categoria;

  botoesMenu.forEach(link => link.classList.remove("ativo"));
  botaoCategoria.classList.add("ativo");

  tituloProdutos.textContent = categoriaAtual ? botaoCategoria.textContent : "Nossos Produtos";
  carregarProdutos();
}

async function enviarContato(evento) {
  evento.preventDefault();

  const nome = contatoNome.value.trim();
  const email = contatoEmail.value.trim();
  const assunto = contatoAssunto.value.trim();
  const mensagem = contatoMensagem.value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    alert("Preencha todos os campos do contato.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/contatos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        email,
        assunto,
        mensagem
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || "Nao foi possivel enviar o email.");
    }

    formContato.reset();
    alert("Mensagem enviada com sucesso!");
  } catch (erro) {
    alert(erro.message);
  }
}

function comprarProduto(produtoId) {
  const produto = produtosCarregados.find(item => item.id === produtoId);

  if (!produto) {
    alert("Produto nao encontrado.");
    return;
  }

  const itemCarrinho = carrinhoProdutos.find(item => item.id === produtoId);

  if (itemCarrinho) {
    if (itemCarrinho.quantidade >= produto.estoque) {
      alert("Nao ha mais estoque disponivel para este produto.");
      return;
    }

    itemCarrinho.quantidade += 1;
  } else {
    carrinhoProdutos.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      imagemUrl: produto.imagemUrl,
      quantidade: 1
    });
  }

  salvarCarrinho();
  renderizarCarrinho();
  abrirCarrinho();
}

function salvarCarrinho() {
  localStorage.setItem("carrinhoMundoEncantado", JSON.stringify(carrinhoProdutos));
}

function abrirCarrinho() {
  carrinho.classList.add("aberto");
  carrinhoFundo.classList.add("aberto");
}

function fecharCarrinho() {
  carrinho.classList.remove("aberto");
  carrinhoFundo.classList.remove("aberto");
}

function abrirConta() {
  conta.classList.add("aberto");
  contaFundo.classList.add("aberto");
}

function fecharConta() {
  conta.classList.remove("aberto");
  contaFundo.classList.remove("aberto");
}

function abrirPagamento() {
  const endereco = enderecoPedido.value.trim();

  if (carrinhoProdutos.length === 0) {
    alert("Adicione produtos ao carrinho antes de finalizar.");
    return;
  }

  if (!endereco) {
    alert("Informe o endereco de entrega.");
    return;
  }

  if (!sessaoUsuario || !sessaoUsuario.token) {
    alert("Entre na sua conta antes de finalizar o pedido.");
    abrirConta();
    return;
  }

  resumoPagamento.innerHTML = `
    <p><strong>Total:</strong> ${formatarPreco(calcularTotalCarrinho())}</p>
    <p><strong>Itens:</strong> ${carrinhoProdutos.reduce((total, item) => total + item.quantidade, 0)}</p>
    <p><strong>Entrega:</strong> ${endereco}</p>
  `;

  fecharCarrinho();
  pagamento.classList.add("aberto");
  pagamentoFundo.classList.add("aberto");
}

function fecharPagamento() {
  pagamento.classList.remove("aberto");
  pagamentoFundo.classList.remove("aberto");
}

function selecionarAbaConta(aba) {
  const mostrarCadastro = aba === "cadastro";

  abaEntrar.classList.toggle("ativa", !mostrarCadastro);
  abaCadastrar.classList.toggle("ativa", mostrarCadastro);
  formEntrar.classList.toggle("ativo", !mostrarCadastro);
  formCadastrar.classList.toggle("ativo", mostrarCadastro);
}

function salvarSessao(sessao) {
  sessaoUsuario = sessao;
  localStorage.setItem("sessaoMundoEncantado", JSON.stringify(sessaoUsuario));
  atualizarConta();
}

function sairDaConta() {
  sessaoUsuario = null;
  localStorage.removeItem("sessaoMundoEncantado");
  atualizarConta();
}

function atualizarConta() {
  if (sessaoUsuario && sessaoUsuario.usuario) {
    btnConta.textContent = sessaoUsuario.usuario.nome;
    usuarioLogado.innerHTML = `
      <strong>Logada como:</strong>
      <span>${sessaoUsuario.usuario.nome}</span>
      <small>${sessaoUsuario.usuario.email}</small>
    `;
    btnSair.style.display = "block";
    formEntrar.style.display = "none";
    formCadastrar.style.display = "none";
    document.querySelector(".abas-conta").style.display = "none";
    return;
  }

  btnConta.textContent = "Entrar";
  usuarioLogado.innerHTML = "<p>Entre ou cadastre-se para finalizar pedidos.</p>";
  btnSair.style.display = "none";
  formEntrar.style.display = "";
  formCadastrar.style.display = "";
  document.querySelector(".abas-conta").style.display = "";
  selecionarAbaConta("entrar");
}

async function fazerLogin(evento) {
  evento.preventDefault();

  try {
    const resposta = await fetch(`${API_URL}/entrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail.value.trim(),
        senha: loginSenha.value.trim()
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || "Nao foi possivel entrar.");
    }

    salvarSessao(dados);
    fecharConta();
    alert("Login feito com sucesso!");
  } catch (erro) {
    alert(erro.message);
  }
}

async function cadastrarUsuario(evento) {
  evento.preventDefault();

  try {
    const respostaCadastro = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: cadastroNome.value.trim(),
        email: cadastroEmail.value.trim(),
        senha: cadastroSenha.value.trim()
      })
    });

    const dadosCadastro = await respostaCadastro.json();

    if (!respostaCadastro.ok) {
      throw new Error(dadosCadastro.mensagem || "Nao foi possivel cadastrar.");
    }

    const respostaLogin = await fetch(`${API_URL}/entrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cadastroEmail.value.trim(),
        senha: cadastroSenha.value.trim()
      })
    });

    const dadosLogin = await respostaLogin.json();

    if (!respostaLogin.ok) {
      throw new Error(dadosLogin.mensagem || "Cadastro feito, mas o login falhou.");
    }

    salvarSessao(dadosLogin);
    fecharConta();
    alert("Cadastro feito com sucesso!");
  } catch (erro) {
    alert(erro.message);
  }
}

function alterarQuantidade(produtoId, mudanca) {
  const itemCarrinho = carrinhoProdutos.find(item => item.id === produtoId);

  if (!itemCarrinho) {
    return;
  }

  const novaQuantidade = itemCarrinho.quantidade + mudanca;

  if (novaQuantidade <= 0) {
    carrinhoProdutos = carrinhoProdutos.filter(item => item.id !== produtoId);
  } else if (novaQuantidade <= itemCarrinho.estoque) {
    itemCarrinho.quantidade = novaQuantidade;
  } else {
    alert("Quantidade maior que o estoque disponivel.");
  }

  salvarCarrinho();
  renderizarCarrinho();
}

function removerDoCarrinho(produtoId) {
  carrinhoProdutos = carrinhoProdutos.filter(item => item.id !== produtoId);
  salvarCarrinho();
  renderizarCarrinho();
}

function calcularTotalCarrinho() {
  return carrinhoProdutos.reduce((total, item) => {
    return total + Number(item.preco) * item.quantidade;
  }, 0);
}

async function buscarCepPedido() {
  const cep = cepPedido.value.trim();

  if (!cep) {
    alert("Informe o CEP.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/enderecos/${cep}`);
    const endereco = await resposta.json();

    if (!resposta.ok) {
      throw new Error(endereco.mensagem || "CEP nao encontrado.");
    }

    enderecoPedido.value = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`;
  } catch (erro) {
    alert(erro.message);
  }
}

async function criarPagamento() {
  const resposta = await fetch(`${API_URL}/pagamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      valor: calcularTotalCarrinho(),
      metodo: metodoPagamento.value,
      pedidoResumo: carrinhoProdutos.map(item => `${item.quantidade}x ${item.nome}`).join(", ")
    })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Pagamento nao aprovado.");
  }

  return dados;
}

async function enviarEmailConfirmacao(pedido, pagamento) {
  if (!sessaoUsuario || !sessaoUsuario.usuario) {
    return;
  }

  await fetch(`${API_URL}/emails`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      assunto: `Pedido ${pedido.id} confirmado`,
      mensagem: `Cliente: ${sessaoUsuario.usuario.nome}\nEmail: ${sessaoUsuario.usuario.email}\nPedido criado com pagamento ${pagamento.status}. Total: ${formatarPreco(pagamento.valor)}.`
    })
  });
}

function renderizarCarrinho() {
  const quantidadeTotal = carrinhoProdutos.reduce((total, item) => total + item.quantidade, 0);
  contadorCarrinho.textContent = quantidadeTotal;
  totalCarrinho.textContent = formatarPreco(calcularTotalCarrinho());

  if (carrinhoProdutos.length === 0) {
    itensCarrinho.innerHTML = '<p class="carrinho-vazio">Seu carrinho esta vazio.</p>';
    return;
  }

  itensCarrinho.innerHTML = "";

  carrinhoProdutos.forEach(item => {
    const itemElemento = document.createElement("div");
    itemElemento.classList.add("carrinho-item");

    itemElemento.innerHTML = `
      <img src="${montarCaminhoImagem(item)}" alt="${item.nome}">
      <div class="carrinho-info">
        <h4>${item.nome}</h4>
        <p>${formatarPreco(item.preco)}</p>
        <div class="quantidade">
          <button type="button" onclick="alterarQuantidade(${item.id}, -1)">-</button>
          <span>${item.quantidade}</span>
          <button type="button" onclick="alterarQuantidade(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remover" type="button" onclick="removerDoCarrinho(${item.id})">X</button>
    `;

    itensCarrinho.appendChild(itemElemento);
  });
}

async function finalizarPedido() {
  if (carrinhoProdutos.length === 0) {
    alert("Adicione produtos ao carrinho antes de finalizar.");
    return;
  }

  const endereco = enderecoPedido.value.trim();
  if (!endereco) {
    alert("Informe o endereco de entrega.");
    return;
  }

  if (!sessaoUsuario || !sessaoUsuario.token) {
    alert("Entre na sua conta antes de finalizar o pedido.");
    abrirConta();
    return;
  }

  try {
    const pagamento = await criarPagamento();
    const resposta = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessaoUsuario.token}`
      },
      body: JSON.stringify({
        endereco,
        itens: carrinhoProdutos.map(item => ({
          produtoId: item.id,
          quantidade: item.quantidade
        }))
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || "Erro ao finalizar pedido.");
    }

    carrinhoProdutos = [];
    salvarCarrinho();
    renderizarCarrinho();
    fecharPagamento();
    await carregarProdutos();
    await enviarEmailConfirmacao(dados, pagamento);
    alert(`Pedido ${dados.id} criado com sucesso! Pagamento ${pagamento.status}.`);
  } catch (erro) {
    alert(erro.message);
  }
}

function limparCarrinho() {
  carrinhoProdutos = [];
  salvarCarrinho();
  renderizarCarrinho();
}

busca.addEventListener("input", carregarProdutos);
botao.addEventListener("click", carregarProdutos);
btnLogoHome.addEventListener("click", voltarParaHome);
btnContatoMenu.addEventListener("click", mostrarContato);
formContato.addEventListener("submit", enviarContato);
linksCategoria.forEach(link => {
  link.addEventListener("click", () => filtrarPorCategoria(link));
});
btnCarrinho.addEventListener("click", abrirCarrinho);
btnConta.addEventListener("click", abrirConta);
btnFecharConta.addEventListener("click", fecharConta);
contaFundo.addEventListener("click", fecharConta);
abaEntrar.addEventListener("click", () => selecionarAbaConta("entrar"));
abaCadastrar.addEventListener("click", () => selecionarAbaConta("cadastro"));
formEntrar.addEventListener("submit", fazerLogin);
formCadastrar.addEventListener("submit", cadastrarUsuario);
btnSair.addEventListener("click", sairDaConta);
btnFecharCarrinho.addEventListener("click", fecharCarrinho);
carrinhoFundo.addEventListener("click", fecharCarrinho);
btnBuscarCep.addEventListener("click", buscarCepPedido);
btnFinalizarPedido.addEventListener("click", abrirPagamento);
btnFecharPagamento.addEventListener("click", fecharPagamento);
pagamentoFundo.addEventListener("click", fecharPagamento);
btnConfirmarPagamento.addEventListener("click", finalizarPedido);
btnLimparCarrinho.addEventListener("click", limparCarrinho);

busca.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    carregarProdutos();
  }
});

carregarProdutos();
renderizarCarrinho();
atualizarConta();
