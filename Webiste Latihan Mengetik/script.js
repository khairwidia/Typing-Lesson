const wordDisplay = document.getElementById('word-display');
const inputField = document.getElementById('input-field');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const languageSelect = document.getElementById('language-select');

const wordLists = {
  en: `the quick brown fox jumps over the lazy dog hello world practice typing speed accuracy keyboard skill challenge letter sentence random test words language`.split(' '),
  id: `saya kamu kita mereka mengetik latihan kecepatan akurasi papan tombol huruf kalimat acak ujian kata bahasa indonesia belajar dunia`.split(' ')
};

let currentLang = 'en';
let targetWords = [];
let startTime, correctChars = 0, totalTyped = 0, timerStarted = false;

function generateWords(count = 30) {
  const wordList = wordLists[currentLang];
  targetWords = [];
  for (let i = 0; i < count; i++) {
    targetWords.push(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  displayWords();
}

function displayWords() {
  wordDisplay.innerHTML = '';
  targetWords.forEach(word => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    wordDisplay.appendChild(span);
  });
}

function updateDisplay() {
  const input = inputField.value.trim();
  const inputWords = input.split(' ');

  let correct = 0;
  correctChars = 0;
  totalTyped = input.length;

  const spans = wordDisplay.querySelectorAll('span');
  spans.forEach((span, idx) => {
    const word = targetWords[idx] || '';
    const inputWord = inputWords[idx] || '';

    span.className = '';

    if (inputWord === '') return;

    if (inputWord === word) {
      span.classList.add('correct');
      correct++;
      correctChars += word.length;
    } else {
      span.classList.add('incorrect');
    }
  });

  const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);
  const elapsed = (Date.now() - startTime) / 60000;
  const wpm = elapsed > 0 ? Math.round((correct / elapsed)) : 0;

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
}

inputField.addEventListener('input', () => {
  if (!timerStarted) {
    startTime = Date.now();
    timerStarted = true;
  }
  updateDisplay();
});

restartBtn.addEventListener('click', () => {
  inputField.value = '';
  inputField.focus();
  generateWords();
  timerStarted = false;
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '100';
});

languageSelect.addEventListener('change', () => {
  currentLang = languageSelect.value;
  inputField.value = '';
  inputField.focus();
  generateWords();
  timerStarted = false;
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent = '100';
});

generateWords();
