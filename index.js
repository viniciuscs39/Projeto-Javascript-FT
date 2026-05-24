
const produtos = [
  { categoria: "Hambúrguer", nome: "Clássico da Casa", preco: 25, value: "classico" },
  { categoria: "Hambúrguer", nome: "Barbecue Bacon", preco: 28, value: "barbecue" },
  { categoria: "Hambúrguer", nome: "Veggie Grill", preco: 26, value: "veggie" },
  { categoria: "Acompanhamento", nome: "Batata Frita", preco: 12, value: "batata" },
  { categoria: "Bebida", nome: "Refrigerante", preco: 6, value: "refrigerante" },
  { categoria: "Bebida", nome: "Suco Natural", preco: 8, value: "suco" },
  { categoria: "Bebida", nome: "Água", preco: 4, value: "agua" }
];

function buscarProduto(value) {
  return produtos.find(p => p.value === value);
}

let resumoTexto = "";

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  const produto = document.getElementById("produto").value;
  const acompanhamento = document.getElementById("acompanhamento").value;
  const bebida = document.getElementById("bebida").value;
  const quantidade = Math.max(1, parseInt(document.getElementById("quantidade").value) || 1);
  const mensagem = document.getElementById("mensagem").value; // 🔹 captura observação

  let itens = [];
  let total = 0;

  if (produto) {
    const item = buscarProduto(produto);
    itens.push(`${quantidade}x ${item.nome}`);
    total += item.preco * quantidade;
  }

  if (acompanhamento && acompanhamento !== "sem") {
    const item = buscarProduto(acompanhamento);
    itens.push(item.nome);
    total += item.preco;
  }

  if (bebida && bebida !== "sem") {
    const item = buscarProduto(bebida);
    itens.push(item.nome);
    total += item.preco;
  }

  // 🔹 resumo com observação
  resumoTexto = `Resumo do Pedido:\nItens: ${itens.join(", ")}\nTotal: R$${total.toFixed(2)}\nObservação: ${mensagem}`;

  const resumo = document.getElementById("resumoPedido");
  resumo.innerHTML = `
    <h3>Resumo do Pedido</h3>
    <p>Itens: ${itens.join(", ")}</p>
    <p>Total: R$${total.toFixed(2)}</p>
    <p><strong>Observação:</strong> ${mensagem}</p>
  `;
});

// Botão Finalizar Pedido → WhatsApp
document.getElementById("finalizarPedido").addEventListener("click", () => {
  if (!resumoTexto) {
    alert("Preencha o formulário e clique em Enviar antes de finalizar o pedido.");
    return;
  }
  const telefone = "5599999999999"; // coloque aqui o número do WhatsApp do Foodtruck
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(resumoTexto)}`;
  window.open(url, "_blank");
});


// Botão Finalizar Pedido → WhatsApp
document.getElementById("finalizarPedido").addEventListener("click", () => {
  if (!resumoTexto) {
    alert("Preencha o formulário e clique em Enviar antes de finalizar o pedido.");
    return;
  }
  const telefone = "5599999999999"; // coloque aqui o número do WhatsApp do Foodtruck
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(resumoTexto)}`;
  window.open(url, "_blank");
});
