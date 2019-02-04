let board = document.querySelector('#board');
let images = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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
       newRow.appendChild(newCell);
       positions.push({current: i, imgUrl: images[i]});
       i++;
     board.appendChild(newRow);
     });
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
