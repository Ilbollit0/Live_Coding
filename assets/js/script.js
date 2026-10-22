/*
  REGOLE
  - Solo const/let, mai var.
  - DOM con querySelector / querySelectorAll.
  - Eventi con addEventListener (mai onclick inline nell'HTML).
*/

let usciti = []; // array dei numeri già estratti
const ultimiDaMostrare = 10; // quanti numeri mostrare in cronologia (modificabile)

const tabellone = document.querySelector('#tabellone');
const ultimoNumero = document.querySelector('#ultimo-numero');
const cronologia = document.querySelector('#cronologia');

// 1. Tabellone 1-90, evidenzia i numeri usciti
function rendiTabellone() {
  tabellone.innerHTML = '';
  for (let i = 1; i <= 90; i++) {
    const cella = document.createElement('div');
    cella.classList.add('numero');
    cella.textContent = i;
    if (usciti.includes(i)) {
      cella.classList.add('uscito');
    }
    tabellone.appendChild(cella);
  }
}

// 3. Cronologia: ultimi numeri estratti, dal più recente
function rendiCronologia() {
  if (usciti.length === 0) {
    cronologia.textContent = 'Nessun numero estratto.';
    return;
  }
  cronologia.textContent = usciti.slice(-ultimiDaMostrare).reverse().join(', ');
}

// 2. Estrazione di un numero mai uscito
function estrai() {
  const disponibili = [];
  for (let i = 1; i <= 90; i++) {
    if (!usciti.includes(i)) {
      disponibili.push(i);
    }
  }
  if (disponibili.length === 0) {
    alert('Tutti i numeri sono usciti!');
    return;
  }
  const numero = disponibili[Math.floor(Math.random() * disponibili.length)];
  usciti.push(numero);
  ultimoNumero.textContent = numero;
  rendiTabellone();
  rendiCronologia();
}

// 4. Listener
document.querySelector('#estrai').addEventListener('click', estrai);

document.querySelector('#reset').addEventListener('click', () => {
  usciti = [];
  ultimoNumero.textContent = '-';
  rendiTabellone();
  rendiCronologia();
});

rendiTabellone();