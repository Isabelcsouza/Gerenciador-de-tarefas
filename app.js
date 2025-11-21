const apiUrl = "/api/tarefas";

const form = document.getElementById("formTarefa");
const tarefaIdInput = document.getElementById("tarefaId");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const dataVencInput = document.getElementById("data_vencimento");
const prioridadeInput = document.getElementById("prioridade");
const btnCancelar = document.getElementById("btnCancelar");

const lista = document.getElementById("listaTarefas");

//FUNÇÃO PARA LISTAR TAREFAS

async function carregarTarefas() {

    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();

    lista.innerHTML = ""; 

    tarefas.forEach(t => {

        const card = document.createElement("div");
        card.className = "tarefa-card";
        let prioridadeClass = t.prioridade;  
        
        card.innerHTML = `
            <h3>${t.titulo}</h3>

            <span class="badge ${prioridadeClass}">
                ${t.prioridade}
            </span>

            <p>${t.descricao || ""}</p>

            <p class="text-muted">
                Vencimento: ${t.data_vencimento || "—"}
            </p>

            <div class="card-buttons">
                <button class="btn-editar" onclick="editar(${t.id})">Editar</button>
                <button class="btn-excluir" onclick="remover(${t.id})">Excluir</button>
            </div>
        `;

        lista.appendChild(card);
    });
}

//SALVAR OU EDITAR TAREFA

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
        titulo: tituloInput.value,
        descricao: descricaoInput.value,
        data_vencimento: dataVencInput.value,
        prioridade: prioridadeInput.value
    };

    const id = tarefaIdInput.value;

    if (id) {
        
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

    } else {

        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });
    }

    form.reset();
    tarefaIdInput.value = "";
    btnCancelar.style.display = "none";

    carregarTarefas();
});

//CARREGAR TAREFA PARA EDIÇÃO
window.editar = async function (id) {

    const resposta = await fetch(`${apiUrl}/${id}`);
    const tarefa = await resposta.json();

    tarefaIdInput.value = tarefa.id;
    tituloInput.value = tarefa.titulo;
    descricaoInput.value = tarefa.descricao;
    dataVencInput.value = tarefa.data_vencimento;
    prioridadeInput.value = tarefa.prioridade;

    btnCancelar.style.display = "inline-block";
};


//CANCELAR EDIÇÃO

btnCancelar.addEventListener("click", () => {
    form.reset();
    tarefaIdInput.value = "";
    btnCancelar.style.display = "none";
});


// REMOVER TAREFA

window.remover = async function (id) {

    const confirmar = confirm("Deseja realmente excluir esta tarefa?");
    if (!confirmar) return;

    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    carregarTarefas();
};



carregarTarefas();
