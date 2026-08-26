let nome = "";
let perguntaAtual = 0;
let pontuacao = 0;

const perguntas = [
    "Costumo tomar iniciativa sem esperar instruções?",
    "Busco soluções antes de pedir ajuda?",
    "Identifico oportunidades de melhoria?",
    "Organizo minhas tarefas e prioridades?",
    "Procuro aprender novas habilidades?",
    "Cumpro meus compromissos dentro do prazo?",
    "Aceito desafios fora da minha zona de conforto?",
    "Compartilho ideias para melhorar processos?",
    "Trabalho bem em equipe?",
    "Tenho interesse em aprender sobre negócios e inovação?"
];

function mostrarFormulario(){

    document.querySelector(".container").innerHTML = `
        <h1>Perfil Empreendedor</h1>

        <p>Digite seu nome para iniciar a avaliação.</p>

        <input
            type="text"
            id="nome"
            placeholder="Digite seu nome">

        <br><br>

        <button onclick="iniciarTeste()">
            Começar Avaliação
        </button>

        <br><br>

        <button onclick="location.reload()">
            Voltar
        </button>
    `;
}

function mostrarSobre(){

    document.querySelector(".container").innerHTML = `
        <h1>Sobre o Projeto</h1>

        <p>
            Sistema desenvolvido para avaliar características de
            empreendedorismo, iniciativa e proatividade.
        </p>

        <p>
            O resultado apresenta pontuação, perfil,
            dicas de desenvolvimento e desafios.
        </p>

        <br>

        <button onclick="location.reload()">
            Voltar
        </button>
    `;
}

function iniciarTeste() {

    nome = document.getElementById("nome").value;

    if(nome.length < 3){
        alert("Digite um nome válido!");
        return;
    }

    mostrarPergunta();
}

function mostrarPergunta(){

    let progresso = ((perguntaAtual + 1) / perguntas.length) * 100;

    document.querySelector(".container").innerHTML = `
        <h1>Pergunta ${perguntaAtual + 1} de 10</h1>

        <div class="barra">
            <div class="preenchimento" style="width:${progresso}%"></div>
        </div>

        <p>${perguntas[perguntaAtual]}</p>

<button class="sim" onclick="responder(2)">Sim</button>

<button class="talvez" onclick="responder(1)">Talvez</button>

<button class="nao" onclick="responder(0)">Não</button>
    `;
}

function responder(valor){

    pontuacao += valor;

    perguntaAtual++;

    if(perguntaAtual < perguntas.length){
        mostrarPergunta();
    }
    else{
        mostrarResultado();
    }
}

function mostrarResultado(){

    let percentual = (pontuacao / 20) * 100;

    let perfil = "";
    let dicas = "";
    let desafio = "";
    let classePerfil = "";

    if(pontuacao <= 4){

        perfil = "Iniciante";
classePerfil = "perfil-iniciante";

        dicas = `
            <ul>
                <li>Desenvolva hábitos de organização.</li>
                <li>Crie metas semanais.</li>
                <li>Assuma pequenas responsabilidades.</li>
                <li>Participe mais das atividades.</li>
            </ul>
        `;

        desafio = "Tomar iniciativa em uma tarefa hoje.";
    }

    else if(pontuacao <= 8){

        perfil = "Em Desenvolvimento";
classePerfil = "perfil-desenvolvimento";

        dicas = `
            <ul>
                <li>Observe problemas que podem ser resolvidos.</li>
                <li>Planeje melhor seu tempo.</li>
                <li>Desenvolva mais confiança.</li>
                <li>Participe de novos desafios.</li>
            </ul>
        `;

        desafio = "Resolver um problema sem ajuda.";
    }

    else if(pontuacao <= 12){

        perfil = "Potencial Empreendedor";
classePerfil = "perfil-potencial";

        dicas = `
            <ul>
                <li>Continue aprendendo.</li>
                <li>Compartilhe mais ideias.</li>
                <li>Treine liderança.</li>
                <li>Desenvolva pensamento estratégico.</li>
            </ul>
        `;

        desafio = "Propor uma melhoria para sua equipe.";
    }

    else if(pontuacao <= 16){

        perfil = "Alto Potencial";
classePerfil = "perfil-alto";

        dicas = `
            <ul>
                <li>Lidere pequenas iniciativas.</li>
                <li>Ajude colegas a evoluírem.</li>
                <li>Fortaleça sua comunicação.</li>
                <li>Busque inovação.</li>
            </ul>
        `;

        desafio = "Liderar uma atividade de melhoria.";
    }

    else{

        perfil = "Empreendedor Proativo";
classePerfil = "perfil-proativo";

        dicas = `
            <ul>
                <li>Você demonstra forte proatividade.</li>
                <li>Possui mentalidade empreendedora.</li>
                <li>Tem potencial de liderança.</li>
                <li>Continue inspirando outras pessoas.</li>
            </ul>
        `;

        desafio = "Criar e apresentar uma proposta de melhoria.";
    }

 let resultado = {
    nome: nome,
    pontuacao: pontuacao,
    percentual: percentual,
    perfil: perfil,
    data: new Date().toLocaleString("pt-BR")
};

let historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.push(resultado);

localStorage.setItem(
    "historico",
    JSON.stringify(historico)
);
    document.querySelector(".container").innerHTML = `
        <h1>Relatório Final</h1>

        <h2>${nome}</h2>

        <p><strong>Pontuação:</strong> ${pontuacao} de 20</p>

        <p><strong>Desempenho:</strong> ${percentual}%</p>

        <h2 class="${classePerfil}">
    ${perfil}
</h2>

        <h3>Dicas</h3>

        ${dicas}

        <h3>Desafio</h3>

        <p>${desafio}</p>

        <button onclick="verHistorico()">
    Ver Histórico
</button>

<br><br>
        <button onclick="location.reload()">
            Refazer Teste
        </button>
    `;
}

function verHistorico(){

    let historico =
        JSON.parse(localStorage.getItem("historico")) || [];

    let html = `
        <h1>Histórico</h1>
    `;

    historico.sort((a,b) => b.pontuacao - a.pontuacao);

let top5 = historico.slice(0,5);

top5.forEach((item, index) => {

    let medalha = "🏅";

if(index === 0){
    medalha = "🥇 PRIMEIRO";
}
else if(index === 1){
    medalha = "🥈 SEGUNDO";
}
else if(index === 2){
    medalha = "🥉 TERCEIRO";
}

    html += `
        <div style="
            background:#334155;
            margin:10px;
            padding:15px;
            border-radius:10px;
        ">

            <h3>
    Ranking #${index + 1}
    ${medalha}
    ${item.nome}
</h3>

            <p>Pontuação: ${item.pontuacao}</p>

            <p>Desempenho: ${item.percentual}%</p>

            <p>Perfil: ${item.perfil}</p>
            
            <p>Data: ${item.data}</p>

        </div>
    `;
});

    html += `
    <button onclick="limparHistorico()">
        Limpar Histórico
    </button>

    <br><br>

    <button onclick="location.reload()">
        Voltar
    </button>
`;

    document.querySelector(".container").innerHTML = html;
}

function limparHistorico(){

    localStorage.clear();

    alert("Histórico limpo!");

    location.reload();
}
