import { Cliente, ClienteService } from "./classes.js";
import { criarElementoCliente, validarCampos } from "./utils.js";

const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const btnCadastrar = document.getElementById("btnCadastrar");
const listaClientes = document.getElementById("listaClientes");

// Instanciando o serviço
const apiURL = "https://crudcrud.com/api/18159685d6a64d6795a64a6ef818fd57/clientes";
const clienteService = new ClienteService(apiURL);

// Função principal de atualização da lista
async function atualizarLista() {
  listaClientes.innerHTML = "";
  const clientes = await clienteService.listar();

  // Uso de map() — Programação Funcional
  clientes.map(cliente => {
    const elemento = criarElementoCliente(cliente, excluirCliente);
    listaClientes.appendChild(elemento);
  });
}

// Função para cadastrar
async function cadastrarCliente() {
  const nome = inputNome.value;
  const email = inputEmail.value;

  if (!validarCampos(nome, email)) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoCliente = new Cliente(nome, email);
  await clienteService.cadastrar(novoCliente);

  inputNome.value = "";
  inputEmail.value = "";

  atualizarLista();
}

// Função para excluir
async function excluirCliente(id) {
  await clienteService.excluir(id);
  atualizarLista();
}

// Eventos
btnCadastrar.addEventListener("click", cadastrarCliente);

// Carrega lista ao abrir
atualizarLista();
