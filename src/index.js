const express = require("express");
const cliente = require("./database");

const app = express();

const PORT = 3001;

app.get("/filtro-por-idade/:idade", (requisicao, resposta) => {
  const { idade } = requisicao.params;
  const idadeNumero = Number(idade);

  const usuariosFiltrados = cliente.filter((usuario) => usuario.idade >= idadeNumero);

  return resposta.send(usuariosFiltrados);
});

app.get("/filtro-por-email/:email", (req, res) => {
  const { email } = req.params;

  const usuarioFiltrado = cliente.find((usuario) => usuario.email === email);

  if (!usuarioFiltrado) {
    return res.send("Usuário não foi encontrado.");
  }

  return res.send(usuarioFiltrado);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
