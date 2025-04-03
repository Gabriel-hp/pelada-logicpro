const scriptURL = "https://script.google.com/macros/s/AKfycbxxA845k-TF0XvGRXG99s8EtpZOCILwluD-Z_xU-LZM/dev";

// Alterna entre as telas
function mostrarTela(tela) {
    document.querySelectorAll(".tela").forEach(sec => sec.style.display = "none");
    document.getElementById(tela).style.display = "block";
}

// Confirmar presença
document.getElementById("btnConfirmar").addEventListener("click", function () {
    let nome = document.getElementById("nome").value.trim();
    if (nome) {
        fetch(scriptURL, {
            method: "POST",
            body: JSON.stringify({ acao: "confirmarPresenca", nome: nome }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            document.getElementById("nome").value = "";
        })
        .catch(error => console.error("Erro:", error));
    }
});

// Sortear times
document.getElementById("btnSortear").addEventListener("click", function () {
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ acao: "sortearTimes" }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let timesDiv = document.getElementById("times");
        timesDiv.innerHTML = "";
        data.times.forEach((time, index) => {
            timesDiv.innerHTML += `<h3>Time ${index + 1}</h3><ul>${time.map(j => `<li>${j}</li>`).join("")}</ul>`;
        });
        if (data.timeFora.length) {
            timesDiv.innerHTML += `<h3>Time Fora</h3><ul>${data.timeFora.map(j => `<li>${j}</li>`).join("")}</ul>`;
        }
    })
    .catch(error => console.error("Erro:", error));
});

// Carregar classificação
function carregarClassificacao() {
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ acao: "obterClassificacao" }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let tabela = document.getElementById("tabela-classificacao");
        tabela.innerHTML = data.map(jogador => `<tr><td>${jogador.nome}</td><td>${jogador.pontos}</td></tr>`).join("");
    })
    .catch(error => console.error("Erro:", error));
}

// Carregar times e vitórias
function carregarTimes() {
    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ acao: "obterTimes" }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let tabela = document.getElementById("tabela-times");
        tabela.innerHTML = data.map(time => `<tr><td>${time.nome}</td><td>${time.vitorias}</td></tr>`).join("");
    })
    .catch(error => console.error("Erro:", error));
}

// Chamadas automáticas ao abrir a página
document.addEventListener("DOMContentLoaded", function () {
    carregarClassificacao();
    carregarTimes();
});