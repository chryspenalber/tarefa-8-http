
export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this._id = id;
  }
}

export class ClienteService {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  async listar() {
    const resposta = await fetch(this.apiURL);
    return resposta.json();
  }

  async cadastrar(cliente) {
    const resposta = await fetch(this.apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return resposta.ok;
  }

  async excluir(id) {
    const resposta = await fetch(`${this.apiURL}/${id}`, {
      method: "DELETE",
    });
    return resposta.ok;
  }
}
