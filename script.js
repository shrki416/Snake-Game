const grid = document.querySelector(".grid");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
let currentSnake = [2, 1, 0];
let squares = [];
let direction = 1;

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
move();

let gameLoop = setInterval(move, 1000);
