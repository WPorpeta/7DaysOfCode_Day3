// Variáveis globais
let areaEscolhida = '';
let tecnologiaEscolhida = '';
let especializacaoEscolhida = '';
const tecnologiasAprendidas = [];

// Ícones para tecnologias
const iconesTecnologias = {
    react: "fab fa-react",
    vue: "fab fa-vuejs",
    "c#": "fab fa-microsoft",
    java: "fab fa-java",
    javascript: "fab fa-js-square",
    typescript: "fas fa-code",
    python: "fab fa-python",
    node: "fab fa-node-js",
    default: "fas fa-code"
};

// Passo 1: Escolher Front-End ou Back-End
document.getElementById("confirmarArea").addEventListener("click", function() {
    areaEscolhida = document.getElementById("area").value;
    
    if (areaEscolhida === "") {
        alert("Por favor, selecione Front-End ou Back-End!");
        return;
    }

    const selectTecnologia = document.getElementById("tecnologia");
    selectTecnologia.innerHTML = '';
    
    const opcoesTecnologia = areaEscolhida === 'front' 
        ? ['React', 'Vue'] 
        : ['C#', 'Java'];
    
    opcoesTecnologia.forEach(tech => {
        const option = document.createElement("option");
        option.value = tech.toLowerCase();
        option.textContent = tech;
        selectTecnologia.appendChild(option);
    });

    document.getElementById("etapa1").classList.add("hidden");
    document.getElementById("etapa2").classList.remove("hidden");
    document.getElementById("perguntaTecnologia").textContent = 
        `2. Escolha uma tecnologia para ${areaEscolhida === 'front' ? 'Front-End' : 'Back-End'}:`;
});

// Passo 2: Escolher tecnologia específica
document.getElementById("confirmarTecnologia").addEventListener("click", function() {
    tecnologiaEscolhida = document.getElementById("tecnologia").value;
    
    document.getElementById("etapa2").classList.add("hidden");
    document.getElementById("etapa3").classList.remove("hidden");
});

// Passo 3: Escolher especialização
document.getElementById("confirmarEspecializacao").addEventListener("click", function() {
    especializacaoEscolhida = document.getElementById("especializacao").value;
    
    document.getElementById("etapa3").classList.add("hidden");
    document.getElementById("etapa4").classList.remove("hidden");
});

// Passo 4: Adicionar tecnologias
document.getElementById("adicionarTecBtn").addEventListener("click", function() {
    const novaTecnologia = document.getElementById("novaTecnologia").value.trim();
    
    if (novaTecnologia) {
        tecnologiasAprendidas.push(novaTecnologia);
        
        const lista = document.getElementById("listaTecnologias");
        const item = document.createElement("li");
        const icone = iconesTecnologias[novaTecnologia.toLowerCase()] || iconesTecnologias.default;
        
        item.innerHTML = `
            <i class="${icone} icone-tecnologia"></i>
            ${novaTecnologia} - ${gerarComentario(novaTecnologia)}
            <button class="btn-excluir" onclick="excluirTecnologia('${novaTecnologia}')">X</button>
        `;
        lista.appendChild(item);
        
        document.getElementById("novaTecnologia").value = "";
        document.getElementById("finalizar").classList.remove("hidden");
    }
});

// Função para excluir uma tecnologia
function excluirTecnologia(tech) {
    // Remove a tecnologia da lista
    const index = tecnologiasAprendidas.indexOf(tech);
    if (index !== -1) {
        tecnologiasAprendidas.splice(index, 1);
    }
    
    // Atualiza a lista na interface
    const lista = document.getElementById("listaTecnologias");
    lista.innerHTML = ''; // Limpa a lista
    
    // Recria a lista com os itens restantes
    tecnologiasAprendidas.forEach(tech => {
        const item = document.createElement("li");
        const icone = iconesTecnologias[tech.toLowerCase()] || iconesTecnologias.default;
        
        item.innerHTML = `
            <i class="${icone} icone-tecnologia"></i>
            ${tech} - ${gerarComentario(tech)}
            <button class="btn-excluir" onclick="excluirTecnologia('${tech}')">X</button>
        `;
        lista.appendChild(item);
    });
    
    // Se não houver mais tecnologias, esconde o botão "Finalizar"
    if (tecnologiasAprendidas.length === 0) {
        document.getElementById("finalizar").classList.add("hidden");
    }
}

// Finalizar
document.getElementById("finalizar").addEventListener("click", function() {
    const resumoFinal = document.getElementById("resultadoFinal");
    resumoFinal.innerHTML = `
        <div class="icone-celebracao">🎉</div>
        <h2>Parabéns pelas suas escolhas!</h2>
        <p id="resumoArea">${areaEscolhida === 'front' ? 'Front-End' : 'Back-End'}</p>
        <p id="resumoTecnologia">Tecnologia principal: ${tecnologiaEscolhida}</p>
        <p id="resumoEspecializacao">${especializacaoEscolhida === 'especializar' 
            ? "Você escolheu se especializar na área" 
            : "Você escolheu se tornar Fullstack"}</p>
        <p id="resumoTecnologias">Tecnologias para aprender: ${tecnologiasAprendidas.join(', ')}</p>
        
        <div class="mensagem-incentivo">
            <strong>Você está no caminho certo!</strong><br>
            Aprender ${tecnologiasAprendidas.length > 1 ? 'essas tecnologias' : 'essa tecnologia'} 
            vai abrir portas incríveis para o seu futuro na programação. 
            Continue se dedicando e logo você estará construindo soluções incríveis!
        </div>
        
        <button id="reiniciar">Reiniciar</button>
    `;

    document.getElementById("etapa4").classList.add("hidden");
    resumoFinal.classList.remove("hidden");

    // Adiciona evento ao botão Reiniciar
    document.getElementById("reiniciar").addEventListener("click", function() {
        location.reload();
    });
});

// Função para gerar comentários
function gerarComentario(tech) {
    const comentarios = {
        react: "Biblioteca JavaScript para interfaces!",
        vue: "Framework progressivo para interfaces!",
        "c#": "Linguagem poderosa para desenvolvimento Windows!",
        java: "Linguagem robusta para aplicações empresariais!",
        javascript: "A linguagem fundamental da web!",
        typescript: "JavaScript com tipagem estática!",
        python: "Ótima para ciência de dados e automação!",
        default: "Ótima escolha para se desenvolver!"
    };

    return comentarios[tech.toLowerCase()] || comentarios.default;
}

// Botão Voltar: Etapa 2 -> Etapa 1
document.getElementById("voltarEtapa1").addEventListener("click", function() {
    document.getElementById("etapa2").classList.add("hidden");
    document.getElementById("etapa1").classList.remove("hidden");
});

// Botão Voltar: Etapa 3 -> Etapa 2
document.getElementById("voltarEtapa2").addEventListener("click", function() {
    document.getElementById("etapa3").classList.add("hidden");
    document.getElementById("etapa2").classList.remove("hidden");
});

// Botão Voltar: Etapa 4 -> Etapa 3
document.getElementById("voltarEtapa3").addEventListener("click", function() {
    document.getElementById("etapa4").classList.add("hidden");
    document.getElementById("etapa3").classList.remove("hidden");
});
