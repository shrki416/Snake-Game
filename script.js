const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
let currentSnake = [2, 1, 0];
let squares = [];
let direction = 1;
let width = 10;

const createGrid = () => {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
};

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

const move = () => {
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");
};

let gameLoop = setInterval(move, 1000);

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
