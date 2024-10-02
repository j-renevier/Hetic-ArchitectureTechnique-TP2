let domaine = 'http://15.237.254.215:3000';
let displayValue = '';
const historyList = document.getElementById('history');

// Fonction pour ajouter un numéro
function appendNumber(number) {
  displayValue += number;
  document.getElementById('display').value = displayValue;
}

// Fonction pour ajouter une opération
function appendOperation(operation) {
  displayValue += ' ' + operation + ' ';
  document.getElementById('display').value = displayValue;
}

// Fonction pour effacer l'écran
function clearDisplay() {
  displayValue = '';
  document.getElementById('display').value = '';
}

// Fonction pour envoyer le calcul au backend et mettre à jour l'historique
function calculate() {
  fetch(`${domaine}/calcul`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation: displayValue }),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('display').value = data.result;
      displayValue = data.result;
      updateHistory();
    })
    .catch(error => console.error('Erreur:', error));
}

// Fonction pour mettre à jour l'historique
function updateHistory() {
  fetch(`${domaine}/historique`)
    .then(response => response.json())
    .then(data => {
      historyList.innerHTML = '';
      data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.operation} = ${entry.resultat}`;
        historyList.appendChild(li);
      });
    })
    .catch(error => console.error('Erreur:', error));
}

// Charger l'historique dès le chargement de la page
window.onload = updateHistory;
