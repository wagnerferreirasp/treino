document.addEventListener("DOMContentLoaded", () => {
    const treinoSelector = document.getElementById("treino-selector");
    const treinoTabela = document.getElementById("treino-tabela");
    const countdownContainer = document.getElementById("countdownContainer"); // O contador
    const thElements = Array.from(treinoTabela.querySelectorAll("th"));
    const tdElements = Array.from(treinoTabela.querySelectorAll("td"));
  
    // Adicionar opções ao seletor com base nos cabeçalhos da tabela
    function populateSelector() {
        thElements.forEach((th) => {
            const option = document.createElement("option");
            option.value = th.textContent.trim();
            option.textContent = th.textContent.trim();
            treinoSelector.appendChild(option);
        });
    }
  
    // Recuperar seleção do localStorage ao carregar a página
    const savedValue = localStorage.getItem("selectedTreino");
    if (savedValue) {
        populateSelector(); // Popula o seletor antes de definir o valor
        treinoSelector.value = savedValue;
        handleSelection(savedValue);
    } else {
        populateSelector(); // Popula o seletor caso nenhuma seleção esteja salva
        countdownContainer.style.display = "none"; // Esconde o contador inicialmente
    }
  
    // Atualizar exibição ao mudar a seleção
    treinoSelector.addEventListener("change", () => {
        const selectedValue = treinoSelector.value;
  
        // Salvar seleção no localStorage
        localStorage.setItem("selectedTreino", selectedValue);
  
        // Atualizar exibição da tabela
        handleSelection(selectedValue);
    });
  
    // Função para atualizar a exibição da tabela e do contador
    function handleSelection(value) {
        if (value === "") {
            // Caso seja "Selecione", exibe a tabela completa e esconde o contador
            treinoTabela.classList.remove("hidden");
            thElements.forEach((th) => (th.style.display = ""));
            tdElements.forEach((td) => (td.style.display = ""));
            countdownContainer.style.display = "none";
        } else {
            // Oculta todas as colunas, exceto a correspondente, e mostra o contador
            const index = thElements.findIndex((th) => th.textContent.trim() === value);
  
            if (index !== -1) {
                treinoTabela.classList.remove("hidden");
                thElements.forEach((th, i) => {
                    th.style.display = i === index ? "" : "none";
                });
                tdElements.forEach((td, i) => {
                    td.style.display = i % thElements.length === index ? "" : "none";
                });
                countdownContainer.style.display = "block";
            }
        }
    }
  });