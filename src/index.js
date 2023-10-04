const express = require("express");
const clientes = require("./database");

const app = express();

const PORT = 3001;

const validacaoIdade = (req, res, next) => {
  const { idade } = req.params;

  if (!Number(idade)) {
    return res.json({ mensagem: "Esse paramtetro é invaldo." });
  }

  next();
};

app.get("/filtro-por-idade/:idade", validacaoIdade, (req, res) => {
  const { idade } = req.params;
  const { ativo, cor } = req.query;

  const idadeNumero = Number(idade);

  console.log(cor);

  let clientesFiltrados;

  if (ativo) {
    clientesFiltrados = clientes.filter(
      (cliente) => cliente.idade >= idadeNumero && cliente.ativo === (ativo === "true")
    );
  } else {
    clientesFiltrados = clientes.filter((cliente) => cliente.idade >= idadeNumero);
  }

  return res.send(clientesFiltrados);
});

app.get("/filtro-por-email/:email", (req, res) => {
  const { email } = req.params;
  const { ativo } = req.query;

  const clienteFiltrado = clientes.find((cliente) => cliente.email === email);

  if (!clienteFiltrado) {
    return res.send("Cliente não foi encontrado.");
  }

  if (ativo) {
    clienteFiltrado.ativo = ativo === "true";
  }

  return res.send(clienteFiltrado);
});

app.get("/atualizar-clientes", (req, res) => {
  clientes.map((cliente) => (cliente.ativo = true));

  return res.send(clientes);
});

// TODO: 04/10
// Rota para adicionar novo campo no objeto usuário/cliente
// Adicionar parâmetro de query para retornar apenas usuários ativos
// Verificar se o valor passado como url params é um inteiro

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
