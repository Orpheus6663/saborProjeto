const { Contato } = require('../Models');

const EMAIL_DESTINO = process.env.EMAIL_DESTINO || 'giovannasilva111222@gmail.com';

function criarCodigo(prefixo) {
  return `${prefixo}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function carregarNodemailer() {
  try {
    return require('nodemailer');
  } catch (erro) {
    return null;
  }
}

function smtpConfigurado() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

async function tentarEnviarEmail({ para, assunto, mensagem, responderPara }) {
  const nodemailer = carregarNodemailer();

  if (!nodemailer || !smtpConfigurado()) {
    console.log('Email salvo em modo simulado:', { para, assunto, mensagem });
    return {
      status: 'salvo_simulado',
      aviso: 'Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e instale nodemailer para enviar emails reais.'
    };
  }

  const transportador = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const resultado = await transportador.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: para,
    replyTo: responderPara,
    subject: assunto,
    text: mensagem
  });

  return {
    status: 'enviado',
    messageId: resultado.messageId
  };
}

async function enviarEmail(req, res) {
  try {
    const { assunto, mensagem, responderPara } = req.body || {};

    if (!assunto || !mensagem) {
      return res.status(400).json({ mensagem: 'Informe assunto e mensagem.' });
    }

    const envio = await tentarEnviarEmail({
      para: EMAIL_DESTINO,
      assunto,
      mensagem,
      responderPara
    });

    return res.status(envio.status === 'enviado' ? 202 : 200).json({
      ...envio,
      id: criarCodigo('email'),
      para: EMAIL_DESTINO,
      assunto
    });
  } catch (erro) {
    console.error('Erro ao enviar email:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function criarContato(req, res) {
  try {
    const { nome, email, assunto, mensagem } = req.body || {};

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({ mensagem: 'Informe nome, email, assunto e mensagem.' });
    }

    const envio = await tentarEnviarEmail({
      para: EMAIL_DESTINO,
      assunto: `${assunto} - ${nome}`,
      mensagem: `Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`,
      responderPara: email
    });

    const contato = await Contato.create({
      nome,
      email,
      assunto,
      mensagem,
      destinatario: EMAIL_DESTINO,
      status: envio.status === 'enviado' ? 'enviado' : 'salvo_simulado'
    });

    return res.status(201).json({
      contato,
      envio
    });
  } catch (erro) {
    console.error('Erro ao criar contato:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function listarContatos(req, res) {
  try {
    const contatos = await Contato.findAll({ order: [['data', 'DESC']] });
    return res.json(contatos);
  } catch (erro) {
    console.error('Erro ao listar contatos:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function buscarContatoPorId(req, res) {
  try {
    const contato = await Contato.findByPk(req.params.id);

    if (!contato) {
      return res.status(404).json({ mensagem: 'Contato nao encontrado.' });
    }

    return res.json(contato);
  } catch (erro) {
    console.error('Erro ao buscar contato:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function atualizarContato(req, res) {
  try {
    const contato = await Contato.findByPk(req.params.id);

    if (!contato) {
      return res.status(404).json({ mensagem: 'Contato nao encontrado.' });
    }

    const { nome, email, assunto, mensagem, status } = req.body || {};

    await contato.update({
      nome: nome ?? contato.nome,
      email: email ?? contato.email,
      assunto: assunto ?? contato.assunto,
      mensagem: mensagem ?? contato.mensagem,
      status: status ?? contato.status
    });

    return res.json(contato);
  } catch (erro) {
    console.error('Erro ao atualizar contato:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function removerContato(req, res) {
  try {
    const contato = await Contato.findByPk(req.params.id);

    if (!contato) {
      return res.status(404).json({ mensagem: 'Contato nao encontrado.' });
    }

    await contato.destroy();
    return res.json({ mensagem: 'Contato removido com sucesso.' });
  } catch (erro) {
    console.error('Erro ao remover contato:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function criarPagamento(req, res) {
  try {
    const { valor, metodo, pedidoResumo } = req.body || {};
    const valorNumero = Number(valor);
    const metodosAceitos = ['pix', 'cartao', 'boleto'];

    if (!valor || Number.isNaN(valorNumero) || valorNumero <= 0) {
      return res.status(400).json({ mensagem: 'Informe um valor de pagamento valido.' });
    }

    if (!metodo || !metodosAceitos.includes(metodo)) {
      return res.status(400).json({ mensagem: 'Metodo de pagamento invalido.' });
    }

    const pagamento = {
      id: criarCodigo('pagamento'),
      status: 'aprovado',
      metodo,
      valor: valorNumero,
      pedidoResumo: pedidoResumo || null
    };

    if (metodo === 'pix') {
      pagamento.qrCode = `PIX-MUNDO-ENCANTADO-${pagamento.id}`;
    }

    return res.status(201).json(pagamento);
  } catch (erro) {
    console.error('Erro ao criar pagamento:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  atualizarContato,
  buscarContatoPorId,
  criarContato,
  criarPagamento,
  enviarEmail,
  listarContatos,
  removerContato
};
