# Sliding-Tile-Game

JavaScript-based game challenging players to properly order tiles in a square grid.

Deployment link:    decorous-flag.surge.sh


## Description

**MVP:**

This project is a JavaScript-based version of a popular puzzle-like game.

In this particular version of the game, a large square image is split among 15 smaller square tiles, which fill a 4x4 grid leaving one empty space. At the start of the game play -- initialized when the user presses the start button -- these tiles are arranged at random in in the grid.

The user is able to rearrange the tiles on the board by clicking those tiles adjacent to the empty space. The clicked tile is then moved into the empty space, and the empty space now occupies the position of the moved tile.

Game play is complete when the tiles have been property reordered to their starting positions.

**Post-MVP:**

I would like to add the following additional functionalities to my applet:
1. User is able to replay after a win.
2. The game tracks the number of moves taken by the user to reach the win-state.
3. The game tracks the amount of time taken by the user to reach the win-state.
4. The game records the user's least amount of steps after all games.
5. The game records the user's fastest solve time after all games.

## Technologies used:

1. HTML
2. CSS
3. JavaScript - array methods: forEach, filter


## Major problems foreseen
1. How to check whether or not a move is valid
2. Placing the tiles truly at random does not guarantee that the game will be able to be solved.

## Possible solutions to these problems
1. Give each tile an ID from {0,15} and set an ID for the row containing the tile. If the empty tile and clicked tile are in the same row, then check the difference between the IDs (diff = 1). If the empty tile and ID are in the same column, then check if IDs diff = 4.
2. When gameplay is initialized, have the computer virtually scramble the board according to the rules of gameplay. For example, I could have the browser scan for which tiles are adjacent to the empty space and then select a tile at random from that array in order to swap. I imagine that I need to test how many iterations of this generate a board that seems challenging enough for play.


## Reflections

I was happy that I was able to fulfill the MVP and post-MVP goals. On top of these objectives, I was also able to add the following features:

1. User can select the puzzle image from the web or load an image from their computer.
2. User can select the grid size of the puzzle.
3. User can pull up the original image during gameplay as a guide when solving the puzzle.
4. An info link about N^2 - 1 puzzles.

I encountered a number of challenges in adding these features:

1. Several times I found that variables weren't behaving as I intended for them to. I realized that the problem could be solved either by use of a callback function or by elevating a particular variable's scope to global.
2. I learned that audio playback returns a promise object. Because this promise was going unresolved, it was throwing an uncaught error to the console. I spent a lot of time trying to troubleshoot promise objects but was not able to resolve this issue. However, the error had no impact on the functioning of the program.
3. I was having some issues with the nested loops that scramble the puzzle board when the user clicks 'start'. For example, I noticed that if I made one for-loop that iterated 100 times, it was taking too long to execute and slowing the browser. However, if I made an equivalent sequence of three nested loops that iterated 4, 5, and 5 times respectively, the script executed seemingly instantly. I also noticed that for a grid size of 2, the program was freezing up, which didn't make sense because it doesn't seem like it should take that much computational power to perform this task. Using conditionals, I made a special case for n=2, that called randomizeBoard I was wondering if this issue has to do with synchronicity in how the randomizeBoard function is executed.
