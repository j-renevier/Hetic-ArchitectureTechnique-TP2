let domaine = 'http://15.237.254.215:3000'; // L'URL de votre API
const display = document.getElementById('display');
const historyList = document.getElementById('history');

function appendToDisplay(value) {
    if (display.innerText === '0') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function clearDisplay() {
    display.innerText = '0';
}

function calculateResult() {
    const expression = display.innerText;
    try {
        const result = eval(expression);
        display.innerText = result;

        // Sauvegarder dans l'historique
        saveToHistory(expression, result);
    } catch (error) {
        display.innerText = 'Error';
    }
}

function saveToHistory(expression, result) {
    const entry = { expression, result };

    fetch(`${domaine}/api/history`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    })
    .then(response => response.json())
    .then(data => {
        // Mettre à jour l'affichage de l'historique
        updateHistory();
    })
    .catch(error => console.error('Error:', error));
}

function updateHistory() {
    fetch(`${domaine}/api/history`)
        .then(response => response.json())
        .then(data => {
            historyList.innerHTML = ''; // Réinitialiser la liste
            data.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.expression} = ${entry.result}`;
                historyList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Charger l'historique à l'initialisation
updateHistory();
