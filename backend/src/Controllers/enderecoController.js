const axios = require('axios');

async function buscarEnderecoPorCep(req, res) {
  try {
    const cep = String(req.params.cep).replace(/\D/g, '');

    if (cep.length !== 8) {
      return res.status(400).json({ mensagem: 'CEP invalido. Informe um CEP com 8 numeros.' });
    }

    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (resposta.data.erro) {
      return res.status(404).json({ mensagem: 'CEP nao encontrado.' });
    }

    return res.json({
      cep: resposta.data.cep,
      logradouro: resposta.data.logradouro,
      bairro: resposta.data.bairro,
      cidade: resposta.data.localidade,
      estado: resposta.data.uf,
      complemento: resposta.data.complemento,
      ibge: resposta.data.ibge
    });
  } catch (erro) {
    console.error('Erro ao consultar CEP:', erro.message);
    return res.status(500).json({ mensagem: 'Erro ao consultar endereco.' });
  }
}

module.exports = {
  buscarEnderecoPorCep
};
