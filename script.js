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
     let newRow = document.createElement('div');
     newRow.setAttribute('class','row');
     row.forEach((a) => {
       let newCell = document.createElement('div');
       newCell.setAttribute('class','cell');
       newCell.dataset.y = array.indexOf(row);
       newCell.setAttribute('id',i);
       newCell.addEventListener('click',testForMove);
       newCell.style.background = "url(" + `"${images[i]}"` +")";
       newRow.appendChild(newCell);
       positions.push({current: i});
       i++;
     });
     board.appendChild(newRow);
  });
}
makeBoard(boardPositions);

document.getElementById('0').setAttribute('class','emptySpace');

function testForMove (ev) {
  if (((Math.abs(ev.target.id - document.querySelector('.emptySpace').id) === 1) && (ev.target.dataset.y === document.querySelector('.emptySpace').dataset.y)) || (Math.abs(ev.target.id - document.querySelector('.emptySpace').id) === 4)) {
    document.querySelector('.emptySpace').setAttribute('class','cell');
    ev.target.setAttribute('class','emptySpace');
    swap(positions[ev.target.id], positions[document.querySelector('.emptySpace').id]);
    /* renderScreenAndCheckWin();
    */
  }
}
function swap (x,y) {
  let a = y;
  y = x;
  x = a;
}
function renderScreenAndCheckWin () {
  let boardDivs = document.querySelectorAll('.cell');
  for (i=0;i<boardDivs.length;i++){
    document.getElementById(`${i}`).style.background = "url:(" + positions[i].imgUrl +")";
  }
  if (boardDivs.every((a)=>(a.id == positions[parseInt(a.id)].current))) {
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
