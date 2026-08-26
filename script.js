let nome = "";
let perguntaAtual = 0;
let pontuacao = 0;
let respostas = [];
let respostaBonus = "";

const perguntas = [
    "Quando recebo uma tarefa com pouca orientação, consigo definir sozinho os próximos passos?",

    "Ao identificar uma falha em um processo, costumo sugerir melhorias mesmo quando isso não faz parte da minha função?",

    "Quando encontro obstáculos que dificultam meu trabalho, procuro alternativas antes de solicitar ajuda?",

    "Se uma ideia minha é rejeitada, procuro entender os motivos e aperfeiçoá-la para tentar novamente?",

    "Costumo me antecipar a possíveis problemas antes que eles afetem os resultados de uma atividade?",

    "Quando assumo um compromisso, mantenho meu foco até que ele seja concluído mesmo diante de dificuldades?",

    "Se percebo que minha equipe está enfrentando dificuldades, costumo oferecer ajuda espontaneamente?",

    "Quando recebo críticas construtivas, utilizo esse feedback para melhorar meu desempenho?",

    "Costumo buscar novos conhecimentos mesmo quando não existe uma exigência imediata para isso?",

    "Quando preciso tomar uma decisão importante, avalio diferentes alternativas antes de agir?",

    "Mesmo correndo o risco de errar, sinto-me confortável em assumir responsabilidades que outras pessoas evitam?",

    "Quando preciso escolher entre uma solução rápida e uma solução mais eficiente no longo prazo, analiso os impactos antes de decidir?",

    "Se uma atividade urgente surge enquanto estou executando outra tarefa importante, consigo reorganizar minhas prioridades sem perder produtividade?",

    "Quando percebo um conflito de opiniões em uma equipe, procuro ajudar na busca de uma solução equilibrada?",

    "Se tivesse a oportunidade de liderar uma iniciativa para melhorar um processo ou serviço, estaria disposto a assumir essa responsabilidade?"
];

function mostrarFormulario(){

    document.querySelector(".container").innerHTML = `
        <h1>Perfil Empreendedor</h1>

        <p>Digite seu nome para iniciar a avaliação.</p>

        <input
            type="text"
            id="nome"
            placeholder="Digite seu nome">

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

    nome = document.getElementById("nome").value.trim();

    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)){
    alert("Digite apenas letras no nome!");
    return;
}

    if(nome.length < 3){
        alert("Digite um nome válido!");
        return;
    }

    mostrarPergunta();
}

function mostrarPergunta(){

    let progresso = ((perguntaAtual + 1) / perguntas.length) * 100;

    document.querySelector(".container").innerHTML = `
        <h1>Pergunta ${perguntaAtual + 1} de 15</h1>

        <div class="barra">
            <div class="preenchimento" style="width:${progresso}%"></div>
        </div>

        <p>${perguntas[perguntaAtual]}</p>

<button class="sim" onclick="responder(2)">Sim</button>

<button class="nao" onclick="responder(0)">Não</button>

<button class="talvez" onclick="responder(1)">Talvez</button>

${perguntaAtual > 0 ? `
<button class="voltar" onclick="voltarPergunta()">
    ⬅
</button>
` : ""}
    `;
}

function responder(valor){

    respostas.push(valor);

    pontuacao += valor;

    perguntaAtual++;

    if(perguntaAtual < perguntas.length){
    mostrarPergunta();
}
    else{
     mostrarPerguntaBonus();
}
}

function voltarPergunta(){

    if(perguntaAtual === 0){
        return;
    }

    perguntaAtual--;

    pontuacao -= respostas.pop();

    mostrarPergunta();
}

function mostrarPerguntaBonus(){

    document.querySelector(".container").innerHTML = `
        <h1>Pergunta Bônus</h1>

        <p>
            Descreva uma situação em que você identificou
            um problema ou oportunidade de melhoria e tomou
            a iniciativa para agir.
        </p>

        <textarea
    id="respostaBonus"
    placeholder="Digite sua resposta aqui...">
        </textarea>

        <br><br>

        <button onclick="salvarBonus()">
            Finalizar Avaliação
        </button>
    `;
}

function salvarBonus(){

    respostaBonus =
        document.getElementById("respostaBonus").value.trim();

    mostrarResultado();
}

function mostrarResultado(){

    let percentual = Math.round((pontuacao / 30) * 100);

    let perfil = "";
    let dicas = "";
    let desafio = "";
    let classePerfil = "";

    if(pontuacao <= 8){

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

    else if(pontuacao <= 15){

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

    else if(pontuacao <= 21){

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

    else if(pontuacao <= 26){

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
    respostaBonus: respostaBonus,
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

        <p><strong>Pontuação:</strong> ${pontuacao} de 30</p>

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

    if(historico.length === 0){

        document.querySelector(".container").innerHTML = `
            <h1>Histórico</h1>

            <p>Nenhum resultado encontrado.</p>

            <button onclick="location.reload()">
                Voltar
            </button>
        `;

        return;
    }

    let html = `
        <h1>Histórico</h1>
    `;

    historico.sort((a,b) => b.pontuacao - a.pontuacao);

    let top5 = historico.slice(0,5);

    top5.forEach((item) => {

        let medalha = "";

        if(item.pontuacao >= 25){
            medalha = "Ouro";
        }
        else if(item.pontuacao >= 20){
            medalha = "Prata";
        }
        else if(item.pontuacao >= 15){
            medalha = "Bronze";
        }

        html += `
            <div style="
                background:#EFE6D8;
                color:#4B3621;
                margin:10px;
                padding:15px;
                border-radius:10px;
                border:2px solid #DCC7AA;
            ">

                <h3>${item.nome}</h3>

                <p><strong>Classificação:</strong> ${medalha}</p>

                <p>Pontuação: ${item.pontuacao}</p>

                <p>Desempenho: ${item.percentual}%</p>

                <p>Perfil: ${item.perfil}</p>

                <button onclick="verRespostaBonus(\`${item.respostaBonus || "Não respondeu"}\`)">
                    Ver Resposta Bônus
                </button>

                <p>Data: ${item.data}</p>

            </div>
        `;
    });

    html += `
        <button onclick="limparHistorico()">
            Limpar Histórico
        </button>

        <button onclick="location.reload()">
            Voltar
        </button>
    `;

    document.querySelector(".container").innerHTML = html;
}

function verRespostaBonus(resposta){

    document.querySelector(".container").innerHTML = `
        <h1>Resposta Bônus</h1>

       <div class="resposta-bonus">
    <p>${resposta}</p>
        </div>

        <br><br>

        <button onclick="verHistorico()">
            Voltar ao Histórico
        </button>
    `;
}

function limparHistorico(){

    if(!confirm("Deseja realmente apagar todo o histórico?")){
        return;
    }

    localStorage.removeItem("historico");

    alert("Histórico limpo com sucesso!");

    location.reload();
}
