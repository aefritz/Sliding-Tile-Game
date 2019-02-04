let board = document.querySelector('.board');
let images = ["assets/0.png","assets/1.png","assets/2.png","assets/3.png","assets/4.png","assets/5.png","assets/6.png","assets/7.png","assets/8.png","assets/9.png","assets/10.png","assets/11.png","assets/12.png","assets/13.png","assets/14.png","assets/15.png"];
let positions = [];
let boardPositions = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];
function makeBoard (array) {
  let i=0;
  array.forEach((row) => {
     row.forEach((a) => {
       let newCell = document.createElement('div');
       newCell.setAttribute('class','cell');
       newCell.dataset.y = array.indexOf(row);
       newCell.setAttribute('id',i);
       newCell.addEventListener('click',testForMove);
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
  if (((Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 1) || (Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 4))) {
    swapOrder(ev.target, document.querySelector('.emptySpace'));
    renderScreenAndCheckWin();
  }
}
function swapOrder (x,y) {
  let a = x.style.order;
  x.style.order = y.style.order;
  y.style.order = a;
}
function renderScreenAndCheckWin () {
  let boardDivs = Array.from(document.querySelectorAll('.cell'));
  if (boardDivs.every((a)=>(a.id == a.style.order))) {
    alert("You win");
  }
}
function randomizeTiles () {
  let emptyPos = document.querySelector('.emptySpace');
  let boardDivs = Array.from(document.querySelectorAll('.cell'));
  let validMoves = boardDivs.filter(a => (((Math.abs(parseInt(a.id)-parseInt(emptyPos.id)) === 1) && (a.dataset.y === emptyPos.dataset.y))) || (Math.abs(parseInt(a.id)-parseInt(emptyPos.id)) === 4));
  let noOfValidMoves = validMoves.length;
  let incrementForRando = 1 / (noOfValidMoves);
  let newRandom = Math.random();
  let positionToBeSwapped;
  for (i = 0; i <= validMoves.length - 1; i++) {
    if ((newRandom >= i*incrementForRando) && (newRandom < (i+1)*incrementForRando)) {
      positionToBeSwapped = validMoves[i].id;
    }
  }
  swap(positions[emptyPos.id],positions[positionToBeSwapped]);
  document.querySelector('.emptySpace').setAttribute('class','cell');
  document.getElementById(`${positionToBeSwapped}`).setAttribute('class','emptySpace');
}
