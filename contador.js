let currentDiv = null; // Variável para armazenar a div atual
let countdownTimer; // Variável do timer
let isCounting = false; // Flag para verificar se o contador está ativo
let remainingTime = 0; // Tempo restante do contador

// Função para posicionar o contador na primeira div do treino
function positionCountdownInFirstDiv() {
    const selectedTd = document.querySelector('.selected'); // O <td> selecionado
    const divs = selectedTd.querySelectorAll('div'); // Pegando todas as divs dentro do <td>

    if (divs.length === 0) return; // Se não houver divs, não faz nada

    // Coloca o contador na primeira div
    currentDiv = divs[0];

    // Calcula a posição da div dentro do <td>
    const rect = currentDiv.getBoundingClientRect();
    const tdRect = selectedTd.getBoundingClientRect();

    // Calcula a posição do contador em relação ao <td>
    const topPosition = rect.top - tdRect.top;
    const leftPosition = rect.left - tdRect.left;

    // Define a posição do contador em relação ao <td>
    countdownContainer.style.position = 'absolute';
    countdownContainer.style.top = `${topPosition}px`;
    countdownContainer.style.left = `${leftPosition}px`;
    countdownContainer.style.display = 'block'; // Mostrar o contador
}

// Função para iniciar o contador de tempo
function startCountdown(seconds) {
    if (isCounting) return; // Se já estiver contando, não inicia outro contador

    const alarmSound = document.getElementById("alarmSound");
    // Garantir que o som pode ser reproduzido no iPhone:
    alarmSound.play().then(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reinicia o som
      }).catch(error => console.error("Erro ao desbloquear áudio:", error));

    remainingTime = seconds;
    isCounting = true;
    const countdownDisplay = document.getElementById("countdownDisplay");

    countdownDisplay.textContent = `Descanso: ${remainingTime} segundos`;

    countdownTimer = setInterval(() => {
        remainingTime--;
        countdownDisplay.textContent = `Descanso: ${remainingTime} segundos`;

        if (remainingTime <= 0) {
            clearInterval(countdownTimer);
            isCounting = false;
            alarmSound.play(); // Toca o alarme
        }
    }, 1000);
}

// Função para iniciar o contador especial 40/20 (exercício/descanso)
function startSpecialCountdown() {
    if (isCounting) return; // Se já estiver contando, não inicia outro contador

    let remainingTime = 40;
    let isResting = false;
    const countdownDisplay = document.getElementById("countdownDisplay");

    countdownDisplay.textContent = `Exercício: ${remainingTime} segundos`;

    countdownTimer = setInterval(() => {
        remainingTime--;
        if (isResting) {
            countdownDisplay.textContent = `Descanso: ${remainingTime} segundos`;
        } else {
            countdownDisplay.textContent = `Exercício: ${remainingTime} segundos`;
        }

        if (remainingTime <= 0) {
            isResting = !isResting;
            remainingTime = isResting ? 20 : 40; // Alterna entre exercício e descanso
        }

        if (remainingTime <= 0 && !isResting) {
            clearInterval(countdownTimer);
            isCounting = false;
            document.getElementById("alarmSound20").play(); // Toca o alarme
        }
    }, 1000);
}

// Função para manipular o seletor de treino
document.getElementById('treino-selector').addEventListener('change', function () {
    const selectedValue = this.value;
    const tds = document.querySelectorAll('#treino-tabela td');

    // Encontre o <td> correspondente ao treino selecionado
    tds.forEach((td) => {
        if (td.innerText.trim().replace("\n", "  ") === selectedValue) {
            td.classList.add('selected');
            positionCountdownInFirstDiv(); // Coloca o contador na primeira div do treino
        } else {
            td.classList.remove('selected');
        }
    });
});

// Remover as setas de navegação (sem uso agora)
document.querySelector('.arrow-buttons').style.display = 'none';