let listaItem = [
  { categoria: "Hambúrguer", nome: "Clássico da Casa", preco: 25, comprado: false },
  { categoria: "Hambúrguer", nome: "Barbecue Bacon", preco: 28, comprado: false },
  { categoria: "Hambúrguer", nome: "Veggie Grill", preco: 26, comprado: false },
  { categoria: "Acompanhamento", nome: "Batata Frita", preco: 12, comprado: false },
  { categoria: "Bebida", nome: "Refrigerante", preco: 6, comprado: false },
  { categoria: "Bebida", nome: "Suco Natural", preco: 8, comprado: false },
  { categoria: "Bebida", nome: "Água", preco: 4, comprado: false }
];

let itemEditando = null; // guarda índice do item em edição

function gerarLista() {
  const ul = document.getElementById("listaItem");
  ul.innerHTML = "";

  listaItem.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("item-card");

    li.innerHTML = `
      <div class="item-info">
        <input type="checkbox" data-index="${index}" ${item.comprado ? "checked" : ""}>
        <span>${item.categoria} - ${item.nome} (R$${item.preco.toFixed(2)})</span>
      </div>
      <div class="item-actions">
        <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        <button class="btn-editar" onclick="prepararEdicao(${index})">Editar</button>
      </div>
    `;
    ul.appendChild(li);
  });

    ul.querySelectorAll("input[type=checkbox]").forEach(chk => {
    chk.addEventListener("change", (e) => {
      const idx = e.target.dataset.index;
      listaItem[idx].comprado = e.target.checked;
      calcularTotal();
    });
  });
}

function calcularTotal() {
  const total = listaItem
    .filter(item => item.comprado)
    .reduce((acc, item) => acc + item.preco, 0);

  document.getElementById("totalComprado").textContent =
    `Total dos itens comprados: R$${total.toFixed(2)}`;
}

document.getElementById("formItem").addEventListener("submit", (e) => {
  e.preventDefault();
  const categoria = document.getElementById("categoria").value;
  const nome = document.getElementById("nomeItem").value;
  const preco = parseFloat(document.getElementById("preco").value);

  if (itemEditando !== null) {
    
    listaItem[itemEditando] = { 
      categoria, 
      nome, 
      preco, 
      comprado: listaItem[itemEditando].comprado 
    };
    itemEditando = null;
    document.getElementById("btnSubmit").textContent = "Adicionar Item";
  } else {
    
    listaItem.push({ categoria, nome, preco, comprado: false });
  }

  e.target.reset();
  gerarLista();
  calcularTotal();
});

function removerItem(index) {
  listaItem.splice(index, 1);
  gerarLista();
  calcularTotal();
}

function prepararEdicao(index) {
  const item = listaItem[index];
  document.getElementById("categoria").value = item.categoria;
  document.getElementById("nomeItem").value = item.nome;
  document.getElementById("preco").value = item.preco;
  itemEditando = index;

