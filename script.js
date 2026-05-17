const PRECOS = { "HTML": 30, "CSS": 50, "JavaScript": 40 };
let tarefas = [];

function adicionar() {
    const empresa = document.getElementById("empresa").value;
    const servico = document.getElementById("servico").value;
    const horas = parseFloat(document.getElementById("horas").value);
    const imposto = parseFloat(document.getElementById("imposto").value) || 0;
    const desconto = parseFloat(document.getElementById("desconto").value) || 0;
    const urgencia = parseFloat(document.getElementById("urgencia").value) || 0;
    const prazo = document.getElementById("prazo").value;

    if (!empresa || !servico || !horas || !prazo) { 
        alert("Preencha todos os campos!"); 
        return; 
    }

    const bruto = horas * PRECOS[servico];
    const total = (bruto * (1 + imposto/100) * (1 - desconto/100)) * (1 + urgencia/100);
    const [ano, mes, dia] = prazo.split("-");
    const prazoFormatado = `${dia}/${mes}/${ano}`;

    tarefas.push({ 
        id: Date.now(), 
        empresa, 
        servico, 
        horas, 
        total, 
        prazo: prazoFormatado 
    });

    console.log("Total = R$ " + total.toFixed(2));
    resetar();
    atualizar();
}

function resetar() {
    document.getElementById("empresa").value = "";
    document.getElementById("servico").value = "";
    document.getElementById("horas").value = "";
    document.getElementById("imposto").value = "15";
    document.getElementById("desconto").value = "0";
    document.getElementById("urgencia").value = "0";
    document.getElementById("prazo").value = "";
}

function remover(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    atualizar();
}

function atualizar() {
    const lista = document.getElementById("lista");
    
    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa adicionada.</p>';
        return;
    }

    lista.innerHTML = tarefas.map(t => {
        const valor = t.total.toFixed(2);
        const aviso = t.total < 50 ? '⚠️' : '';
        const classe = t.total < 50 ? 'valor-baixo' : '';
        
        return `
            <div class="card-tarefa">
                <span class="${classe}">
                    ${t.empresa} | ${t.servico} | ${t.horas}h | ${t.prazo} | R$ ${valor} ${aviso}
                </span>
                <button class="btn-x" onclick="remover(${t.id})">✕</button>
            </div>
        `;
    }).join("");
}

atualizar();
