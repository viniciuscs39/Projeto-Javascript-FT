
let listaItens = [
  { categoria: "Hambúrguer",    nome: "Clássico da Casa", preco: 25, comprado: false },
  { categoria: "Hambúrguer",    nome: "Barbecue Bacon",   preco: 28, comprado: false },
  { categoria: "Hambúrguer",    nome: "Veggie Grill",     preco: 26, comprado: false },
  { categoria: "Acompanhamento",nome: "Batata Frita",     preco: 12, comprado: false },
  { categoria: "Bebida",        nome: "Refrigerante",     preco: 6,  comprado: false },
  { categoria: "Bebida",        nome: "Suco Natural",     preco: 8,  comprado: false },
  { categoria: "Bebida",        nome: "Água",             preco: 4,  comprado: false }
];


let itemEditando = null;


function gerarLista() {
  const ul = document.getElementById("listaItem");
  ul.innerHTML = ""; 
  
  listaItens.forEach(function(item, index) {
    const li = document.createElement("li");
    li.classList.add("item-card");

    
    if (item.comprado) {
      li.classList.add("comprado");
    }

    li.innerHTML = `
      <div class="item-info">
        <input type="checkbox"
               data-index="${index}"
               ${item.comprado ? "checked" : ""}
               title="Marcar como selecionado">
        <span>${item.categoria} — ${item.nome}
          <strong>(R$${item.preco.toFixed(2)})</strong>
        </span>
      </div>
      <div class="item-actions">
        <button class="btn-remover" onclick="removerItem(${index})" title="Remover item">Remover</button>
        <button class="btn-editar"  onclick="prepararEdicao(${index})" title="Editar item">Editar</button>
      </div>
    `;

    ul.appendChild(li); 
  });

  
  ul.querySelectorAll("input[type=checkbox]").forEach(function(chk) {
    chk.addEventListener("change", function(e) {
      const idx = parseInt(e.target.dataset.index); 
      listaItens[idx].comprado = e.target.checked;  
      gerarLista();      
      calcularTotal();   
    });
  });
}


function calcularTotal() {
  
  const itensSelecionados = listaItens.filter(function(item) {
    return item.comprado;
  });

  
  const total = itensSelecionados.reduce(function(acumulador, item) {
    return acumulador + item.preco;
  }, 0);

  document.getElementById("totalComprado").textContent =
    `Total dos itens selecionados: R$${total.toFixed(2)}`;
}


document.getElementById("formItem").addEventListener("submit", function(e) {
  e.preventDefault(); 

  
  const categoria = document.getElementById("categoria").value;
  const nome      = document.getElementById("nomeItem").value.trim();
  const preco     = parseFloat(document.getElementById("preco").value);

  if (itemEditando !== null) {
    
    
    listaItens[itemEditando] = {
      categoria: categoria,
      nome:      nome,
      preco:     preco,
      comprado:  listaItens[itemEditando].comprado
    };

    
    itemEditando = null;
    document.getElementById("btnSubmit").textContent = "Adicionar Item";
    document.getElementById("btnCancelar").style.display = "none";

  } else {
    
        listaItens.push({
      categoria: categoria,
      nome:      nome,
      preco:     preco,
      comprado:  false
    });
  }

  e.target.reset();   
  gerarLista();       
  calcularTotal();   
});

/
function removerItem(index) {
  
  listaItens.splice(index, 1);

    if (itemEditando === index) {
    cancelarEdicao();
  }

  gerarLista();
  calcularTotal();
}


function prepararEdicao(index) {
  const item = listaItens[index];

  document.getElementById("categoria").value = item.categoria;
  document.getElementById("nomeItem").value  = item.nome;
  document.getElementById("preco").value     = item.preco;

  itemEditando = index; 
  document.getElementById("btnSubmit").textContent  = "Salvar Alteração";
  document.getElementById("btnCancelar").style.display = "inline-block";

  
  document.getElementById("formItem").scrollIntoView({ behavior: "smooth" });
}


function cancelarEdicao() {
  itemEditando = null;
  document.getElementById("formItem").reset();
  document.getElementById("btnSubmit").textContent = "Adicionar Item";
  document.getElementById("btnCancelar").style.display = "none";
}


document.getElementById("btnRemoverUltimo").addEventListener("click", function() {
  if (listaItens.length === 0) {
    alert("A lista já está vazia!");
    return;
  }

  const removido = listaItens.pop(); // remove e guarda o item retirado
  alert(`"${removido.nome}" removido do final da lista.`);

  gerarLista();
  calcularTotal();
});


document.getElementById("btnRemoverPrimeiro").addEventListener("click", function() {
  if (listaItens.length === 0) {
    alert("A lista já está vazia!");
    return;
  }

  const removido = listaItens.shift(); // remove e guarda o item retirado
  alert(`"${removido.nome}" removido do início da lista.`);

  gerarLista();
  calcularTotal();
});


document.getElementById("btnCancelar").addEventListener("click", cancelarEdicao);


document.getElementById("finalizarPedido").addEventListener("click", function() {
  
  const selecionados = listaItens.filter(function(item) {
    return item.comprado;
  });

  if (selecionados.length === 0) {
    alert("Selecione ao menos um item antes de finalizar!");
    return;
  }

  
  const resumo = selecionados.map(function(item) {
    return `• ${item.nome} (${item.categoria}) — R$${item.preco.toFixed(2)}`;
  });

  
  const total = selecionados.reduce(function(acc, item) {
    return acc + item.preco;
  }, 0);

  
  alert(
    "=== Resumo do Pedido ===\n" +
    resumo.join("\n") +
    `\n\nTotal: R$${total.toFixed(2)}\n\nObrigado pela preferência! 🍔`
  );
});


gerarLista();
calcularTotal();
