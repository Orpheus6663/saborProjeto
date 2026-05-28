const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../Models');
const { formatarUsuario } = require('../Utils/formatadores');

async function cadastrarUsuario(req, res) {
  try {
    const dados = req.body || {};
    const nome = dados.nome && dados.nome.trim();
    const email = dados.email && dados.email.trim();
    const senha = dados.senha;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: 'Nome, email e senha sao obrigatorios.' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(409).json({ mensagem: 'Este email ja esta cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    return res.status(201).json(formatarUsuario(usuario));
  } catch (erro) {
    console.error('Erro ao cadastrar usuario:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

async function entrar(req, res) {
  try {
    const dados = req.body || {};
    const email = dados.email && dados.email.trim();
    const senha = dados.senha;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha sao obrigatorios.' });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha invalidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Email ou senha invalidos.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      usuario: formatarUsuario(usuario)
    });
  } catch (erro) {
    console.error('Erro ao fazer login:', erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = {
  cadastrarUsuario,
  entrar
};
