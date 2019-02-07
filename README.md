# Sliding-Tile-Game

JavaScript-based game challenging players to properly order tiles in a square grid.

## Acknowledgements

Images courtesy of Rachel Lang @ https://africageographic.com/blog/crazy-baby-honey-badger/

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
