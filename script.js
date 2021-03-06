let squares = [];
let snake = [2, 1, 0];
let apple = 0;
let direction = 1;
const width = 10;
let score = 0;
let speedInterval = 1000;
let speed = 0.9;
let gameLoop;

const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const scoreDisplay = document.querySelector("#score");

const createGrid = () => {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
};

createGrid();

snake.forEach((index) => squares[index].classList.add("snake"));

const startGame = () => {
  snake.forEach((index) => squares[index].classList.remove("snake"));
  squares[apple].classList.remove("apple");
  clearInterval(gameLoop);
  snake = [2, 1, 0];
  score = 0;
  scoreDisplay.textContent = score;
  direction = 1;
  speedInterval = 1000;
  generateApple();
  snake.forEach((index) => squares[index].classList.add("snake"));
  gameLoop = setInterval(move, 1000);
};

const move = () => {
  if (
    (snake[0] + width >= width * width && direction === width) ||
    (snake[0] % width === width - 1 && direction === 1) ||
    (snake[0] % width === 0 && direction === -1) ||
    (snake[0] - width < 0 && direction === -width) ||
    squares[snake[0] + direction].classList.contains("snake")
  )
    return clearInterval(gameLoop);

  const tail = snake.pop();
  squares[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);

  if (squares[snake[0]].classList.contains("apple")) {
    squares[snake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    snake.push(tail);
    generateApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(gameLoop);
    speedInterval = speedInterval * speed;
    gameLoop = setInterval(move, speedInterval);
  }

  squares[snake[0]].classList.add("snake");
};

const generateApple = () => {
  do {
    apple = Math.floor(Math.random() * squares.length);
  } while (squares[apple].classList.contains("snake"));
  squares[apple].classList.add("apple");
};
generateApple();

const snakeMovement = (e) => {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
};

document.addEventListener("keyup", snakeMovement);
startButton.addEventListener("click", startGame);
