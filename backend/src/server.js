const app = require('./app');
const { prepararBanco } = require('./Database/setup');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await prepararBanco();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar servidor:', erro);
  }
}

iniciarServidor();
