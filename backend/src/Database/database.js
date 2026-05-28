const sequelize = require('./config');

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

module.exports = { sequelize, conectar };
