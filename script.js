let board = document.querySelector('.board');
let images = ["assets/0.png","assets/1.png","assets/2.png","assets/3.png","assets/4.png","assets/5.png","assets/6.png","assets/7.png","assets/8.png","assets/9.png","assets/10.png","assets/11.png","assets/12.png","assets/13.png","assets/14.png","assets/15.png"];
let boardPositions = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];

document.getElementById("start").addEventListener('click', AddListenersAndRandomizeBoard);

function makeBoard (array) {
  let i=0;
  array.forEach((row) => {
     row.forEach((a) => {
       let newCell = document.createElement('div');
       newCell.setAttribute('class','cell');
       newCell.dataset.row = array.indexOf(row);
       newCell.setAttribute('id',i);
       newCell.style.background = "url(" + `"${images[i]}"` +")";
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
  if (boardDivs.every((a)=>(a.id == a.style.order))) {
    alert("You win");
  }
}
function randomizeTiles () {
  let emptyPos = document.querySelector('.emptySpace');
  console.log(emptyPos);
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
}
