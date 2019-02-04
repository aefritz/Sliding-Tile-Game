let board = document.querySelector('.board');
let interval;
let time = 0;
let moves = 0;
let currentBestMoves;
let currentBestTime;
let boardPositions = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];

document.querySelector(".start").addEventListener('click', AddListenersAndRandomizeBoard);

function makeBoard (array) {
  let i=0;
  array.forEach((row) => {
     row.forEach((a) => {
       let newCell = document.createElement('div');
       newCell.setAttribute('class','cell');
       newCell.dataset.row = array.indexOf(row);
       newCell.setAttribute('id',i);
       newCell.style.background = "url(assets/" + `${i}` +".png)";
       newCell.style.order = a-1;
       board.appendChild(newCell);
       i++;
     });
  });
}
makeBoard(boardPositions);

document.getElementById('0').setAttribute('class','emptySpace');

function testForMove (ev) {
  if (((Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 1 && (ev.target.dataset.row == document.querySelector('.emptySpace').dataset.row)) || (Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 4))) {
    swapOrder(ev.target, document.querySelector('.emptySpace'));
    moves++;
    document.querySelector('.number-moves').innerText = `Moves: ${moves}`;
    renderScreenAndCheckWin();
  }
}
function swapOrder (x,y) {
  let a = x.style.order;
  let b = x.dataset.row;
  x.style.order = y.style.order;
  x.dataset.row = y.dataset.row
  y.style.order = a;
  y.dataset.row = b;
}
function renderScreenAndCheckWin () {
  let boardDivs = Array.from(document.querySelectorAll('.cell'));
  if (boardDivs.every(a => (a.id == a.style.order))) {
    alert("You win");
    boardDivs.forEach(a => a.removeEventListener('click',testForMove));
    clearInterval(interval);
    if ((time < currentBestTime) || !(currentBestTime)) {
      currentBestTime = time;
    }
    if (moves < currentBestMoves || !(currentBestMoves)) {
      currentBestMoves = moves;
    }
    updateBestScores();
  }
}
function randomizeTiles () {
  let emptyPos = document.querySelector('.emptySpace');
  let boardDivs = Array.from(document.querySelectorAll('.cell'));
  let validSwitches = boardDivs.filter(a => (((Math.abs(a.style.order-emptyPos.style.order) === 1) && (a.dataset.row == emptyPos.dataset.row))) || (Math.abs(a.style.order-emptyPos.style.order) === 4));
  let noOfValidMoves = validSwitches.length;
  let incrementForRando = 1 / (noOfValidMoves);
  let newRandom = Math.random();
  let positionToBeSwapped;
  for (i = 0; i <= validSwitches.length - 1; i++) {
    if ((newRandom >= i*incrementForRando) && (newRandom < (i+1)*incrementForRando)) {
      positionToBeSwapped = validSwitches[i].id;
    }
  }
  swapOrder(emptyPos, document.getElementById(positionToBeSwapped));
}
function AddListenersAndRandomizeBoard () { //randomizeBoard() makes 100 random moves; nested loops took compute time
  let cells = document.querySelectorAll('.cell');
  cells.forEach(a => a.addEventListener('click',testForMove));
  for (h=0;h<4;h++) {
    for (j=0;j<5;j++) {
      for (i=0;i<5;i++) {
        randomizeTiles();
      }
    }
  }
  time = 0;
  moves = 0;
  interval = setInterval(updateTime, 1000);
}

function updateTime () {
  document.querySelector('.current-time').innerText = `Current Time: ${time} s`;
  document.querySelector('.number-moves').innerText = `Moves: 0`;
  time++;
}

function updateBestScores() {
  document.querySelector('.best-time').innerText = `Current Time: ${currentBestTime} s`;
  document.querySelector('.best-moves').innerText = `Moves: ${currentBestMoves}`;
}
