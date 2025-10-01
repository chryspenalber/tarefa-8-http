// Selecionando elementos da interface
const inputNome = document.getElementById("nome")
const inputEmail = document.getElementById("email")
const btnCadastrar = document.getElementById("btnCadastrar")
const listaClientes = document.getElementById("listaClientes")

// URL da API CrudCrud
const crudcrudURL = "https://crudcrud.com/api/5acf866bd9134127a7f1f061552decca/clientes"

// Função para exibir cliente na tela
function adicionarClienteNaTela(cliente) {
    const div = document.createElement("div")
    div.classList.add("cliente")

    div.innerHTML = `
        <span>${cliente.nome} - ${cliente.email}</span>
        <button class="btnExcluir">Excluir</button>
    `

    // Evento do botão Excluir
    const btnExcluir = div.querySelector(".btnExcluir")
    btnExcluir.addEventListener("click", () => excluirCliente(cliente._id))

    listaClientes.appendChild(div)
}

// Função para mostrar todos os clientes
function listarClientes() {
    listaClientes.innerHTML = ""

    fetch(crudcrudURL)
        .then(resposta => resposta.json())
        .then(clientes => {
            clientes.forEach(cliente => {
                adicionarClienteNaTela(cliente)
            })
        })
        .catch(erro => {
            console.log("Erro ao buscar clientes:", erro)
        })
}

// Função para adicionar cliente
function cadastrarCliente(nome, email) {
    const novoCliente = { nome: nome, email: email }

    fetch(crudcrudURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente)
    })
    .then(resposta => {
        if (resposta.ok) {
            listarClientes()
        } else {
            console.log("Erro ao cadastrar cliente.")
        }
    })
    .catch(erro => {
        console.log("Erro ao cadastrar cliente:", erro)
    })
}

// Função para excluir cliente
function excluirCliente(id) {
    fetch(crudcrudURL + "/" + id, {
        method: "DELETE"
    })
    .then(resposta => {
        if (resposta.ok) {
            listarClientes()
        } else {
            console.log("Erro ao excluir cliente.")
        }
    })
    .catch(erro => {
        console.log("Erro ao excluir cliente:", erro)
    })
}

// Evento de clique no botão Cadastrar
btnCadastrar.addEventListener("click", () => {
    const nome = inputNome.value.trim()
    const email = inputEmail.value.trim()

    if (nome === "" || email === "") {
        alert("Preencha todos os campos.")
        return
    }

    cadastrarCliente(nome, email)

    inputNome.value = ""
    inputEmail.value = ""
})

// Carregar lista de clientes ao abrir a página
listarClientes()
