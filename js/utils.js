

export function criarElementoCliente(cliente, onExcluir) {
  const div = document.createElement("div");
  div.classList.add("cliente");

  div.innerHTML = `
    <span>${cliente.nome} - ${cliente.email}</span>
    <button class="btnExcluir">Excluir</button>
  `;

  const btnExcluir = div.querySelector(".btnExcluir");
  btnExcluir.addEventListener("click", () => onExcluir(cliente._id));

  return div;
}

export function validarCampos(nome, email) {
  return nome.trim() !== "" && email.trim() !== "";
}
