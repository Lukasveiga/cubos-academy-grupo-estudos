const express = require("express");
const clientes = require("./database");

const app = express();

const PORT = 3001;

app.get("/filtro-por-idade/:idade", (req, res) => {
  const { idade } = req.params;
  const idadeNumero = Number(idade);

  const clientesFiltrados = clientes.filter((cliente) => cliente.idade >= idadeNumero);

  return res.send(clientesFiltrados);
});

app.get("/filtro-por-email/:email", (req, res) => {
  const { email } = req.params;

  const clienteFiltrado = clientes.find((cliente) => cliente.email === email);

  if (!clienteFiltrado) {
    return res.send("Cliente não foi encontrado.");
  }

  return res.send(clienteFiltrado);
});

// TODO: 04/10
// Rota para adicionar novo campo no objeto usuário/cliente
// Adicionar parâmetro de query para retornar apenas usuários ativos
// Verificar se o valor passado como url params é um inteiro

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
