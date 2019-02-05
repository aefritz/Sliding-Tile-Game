let board = document.querySelector('.board'); //refers to the div element containing the puzzle
let interval;       //global variable that stores the timer interval when gameplay starts
let time = 0;       //global variable to keep track of the current time when gameplay starts
let moves = 0;      //global variable tracking the player's current number of moves
let currentBestMoves; //global variable storing the player's record number of moves
let currentBestTime;  //global variable storing the player's record time
let boardPositions = [  //two-dimensional array that is iterated through to set up the puzzle and positions
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];
let moveAudio = document.querySelectorAll('audio')[0];
let winAudio = document.querySelectorAll('audio')[1];

document.querySelector(".start").addEventListener('click', AddListenersAndRandomizeBoard); //when clicked, the start button randomizes the board, adds click listeners to each tile, and starts timer and move counters

function makeBoard (array) {
  array.forEach((row) => {
     row.forEach((a) => {
       let newCell = document.createElement('div'); //each tile is a div element
       if (a === 1) {
         newCell.setAttribute('class',`cell id${a} emptySpace`);        //each tile is given the class 'cell'. The class title id_ avoids the use of id tags. The first tile has the additional class emptySpace
       } else {
         newCell.setAttribute('class',`cell id${a}`);
       }
       newCell.dataset.row = array.indexOf(row);    //dataset.row becomes necessary to check whether certain moves are valid below, corresponds with the row in the two dimensional array above.
       newCell.style.background = "url(assets/" + `${a-1}` +".png)"; //accesses the background images for each tile
       newCell.style.order = a;                     //the tiles on the puzzleboard are arranged in a flexbox that wraps; style.order provides an easy way of reordering the tiles and also tracking how they've been rearranged relative to the start;
       board.appendChild(newCell);
     });
  });
}
makeBoard(boardPositions); //runs the function above to set up the board;

function testForMove (ev) {  //testForMove checks whether or not style.order for a div element has a difference of 1 (for same row) or 4 from the empty space. This is the condition that constitutes a valid move.
  if (((Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 1 && (ev.target.dataset.row == document.querySelector('.emptySpace').dataset.row)) || (Math.abs(ev.target.style.order - document.querySelector('.emptySpace').style.order) === 4))) {
    swapOrder(ev.target, document.querySelector('.emptySpace')); //swap the position of the empty space and the target tile
    moves++; //a move was made, so we up the move counter
    moveAudio.currentTime = 0.3;
    moveAudio.play();
    document.querySelector('.number-moves').innerText = `Moves: ${moves}`; //update the move counter in the DOM;
    renderScreenAndCheckWin();
  }
}
function swapOrder (x,y) { //swaps the order of elements x and y
  let a = x.style.order;
  let b = x.dataset.row;
  x.style.order = y.style.order;
  x.dataset.row = y.dataset.row
  y.style.order = a;
  y.dataset.row = b;
}
function renderScreenAndCheckWin () { //checks whether or not the CSS order of the elements matches their classIDs. If so, timers are removed and record scores are updated if necessary.
  let boardDivs = Array.from(document.querySelectorAll('.cell'));
  if (boardDivs.every(a => (extractIDFromClass(a.classList[1]) == a.style.order))) {
    winAudio.play();
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
function randomizeTiles () { //this function locates the empty space in the puzzleboard and searches for the tiles around it that could validly be moved into the space. The function then chooses between these possibilites at random.
  let emptyPos = document.querySelector('.emptySpace');
  let boardDivs = Array.from(document.querySelectorAll('.cell')); //the NodeList needs to be cast as an array before we filter among the necessary conditions
  let validSwitches = boardDivs.filter(a => (((Math.abs(a.style.order-emptyPos.style.order) === 1) && (a.dataset.row == emptyPos.dataset.row))) || (Math.abs(a.style.order-emptyPos.style.order) === 4));
  let noOfValidMoves = validSwitches.length; //how many possible moves are there?
  let incrementForRando = 1 / (noOfValidMoves); //the size of this increment decreases when there are more possibilites. This is used to segment the width [0,1] into a number of intervals. Whichever interval the random number falls into coresponds with which of the possible moves the program will use to scramble the puzzleboard.
  let newRandom = Math.random();
  let positionToBeSwapped;
  for (i = 0; i < validSwitches.length; i++) {
    if ((newRandom >= i*incrementForRando) && (newRandom < (i+1)*incrementForRando)) { //does the random number fall in the ith interval?
      positionToBeSwapped = extractIDFromClass(validSwitches[i].classList[1]);
    }
  }
  swapOrder(emptyPos, document.querySelector(`.id${positionToBeSwapped}`));
}
function AddListenersAndRandomizeBoard () { //randomizeBoard() makes 100 random moves; for some reason nested loops took compute time
  let cells = document.querySelectorAll('.cell');
  cells.forEach(a => a.addEventListener('click',testForMove));
  for (h=0;h<2;h++) {
    for (j=0;j<2;j++) {
      for (i=0;i<2;i++) {
        randomizeTiles();
      }
    }
  }
  time = 0; //following lines reset timers and move counters
  moves = 0;
  interval = setInterval(updateTime, 1000);
  document.querySelector('.number-moves').innerText = `Moves: 0`;
}

function updateTime () {
  document.querySelector('.current-time').innerText = `Current Time: ${time}s`;
  time++;
}

function updateBestScores() {
  document.querySelector('.best-time').innerText = `Best Time: ${currentBestTime} s`;
  document.querySelector('.best-moves').innerText = `Best Moves: ${currentBestMoves}`;
}
function extractIDFromClass (str) { //to avoid use of Id, a unique identifier is stored in a class name for each div element and extracted using this function
  let newArray = str.split('');
  newArray.splice(0,2);
  newStr = newArray.join('');
  return parseInt(newStr);
}
