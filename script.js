var precos = { "HTML": 30, "CSS": 50, "JavaScript": 40 };
var tarefas = [];

function adicionar() {
    var empresa = document.getElementById("empresa").value;
    var servico = document.getElementById("servico").value;
    var horas = parseFloat(document.getElementById("horas").value);
    var imposto = parseFloat(document.getElementById("imposto").value) || 0;
    var desconto = parseFloat(document.getElementById("desconto").value) || 0;
    var urgencia = parseFloat(document.getElementById("urgencia").value) || 0;
    var prazo = document.getElementById("prazo").value;

    if (!empresa || !servico || !horas || !prazo) { alert("Preencha todos os campos!"); return; }

    var bruto = horas * precos[servico];
    var comImposto = bruto * (1 + imposto / 100);
    var valorDesconto = comImposto * (desconto / 100);
    var comDesconto = comImposto - valorDesconto;
    var valorUrgencia = comDesconto * (urgencia / 100);
    var total = comDesconto + valorUrgencia;

    var p = prazo.split("-");

    tarefas.push({ id: Date.now(), empresa: empresa, servico: servico, horas: horas, bruto: bruto, imposto: bruto * (imposto / 100), desconto: valorDesconto, urgencia: valorUrgencia, total: total, prazo: p[2] + "/" + p[1] + "/" + p[0] });

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
    var nova = [];
    for (var i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id !== id) nova.push(tarefas[i]);
    }
    tarefas = nova;
    atualizar();
}

function atualizar() {
    var lista = document.getElementById("lista");
    lista.innerHTML = "";
    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa adicionada.</p>';
    }

    for (var i = 0; i < tarefas.length; i++) {
        var t = tarefas[i];

        var div = document.createElement("div");
        div.className = "card-tarefa";
        var txt = t.empresa + " | " + t.servico + " | " + t.horas + "h | " + t.prazo + " | R$ " + t.total.toFixed(2);

        if (t.total < 50) {
            div.innerHTML = '<span class="valor-baixo">' + txt + ' ⚠️</span>';
        } else {
            div.innerHTML = "<span>" + txt + "</span>";
        }
        div.innerHTML += ' <button class="btn-x" onclick="remover(' + t.id + ')">✕</button>';
        lista.appendChild(div);
    }

}

atualizar();
