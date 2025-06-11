const grid = document.getElementById('colorGrid');
const targetColorEl = document.getElementById('targetColor');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const themeToggle = document.getElementById('themeToggle');

let colors = [];
let targetColor = '';
let score = 0;
let timeLeft = 30;
let timerInterval;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function generateGrid() {
  colors = [];
  grid.innerHTML = '';
  for (let i = 0; i < 36; i++) {
    const color = getRandomColor();
    colors.push(color);
    const box = document.createElement('div');
    box.className = 'box';
    box.style.backgroundColor = color;
    box.onclick = () => handleBoxClick(color);
    grid.appendChild(box);
  }
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  targetColorEl.textContent = targetColor;
}

function handleBoxClick(color) {
  if (color === targetColor) {
    score++;
    scoreEl.textContent = score;
    generateGrid();
  }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  gameOverEl.classList.add('hidden');
  generateGrid();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function gameOver() {
  finalScoreEl.textContent = score;
  gameOverEl.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Start with light theme
document.body.classList.add('light');

// Auto-start game
startGame();
