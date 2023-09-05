// * Script for Tic-Tac-Toe game

// * Board
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// * Players
const players = ['X', 'O'];
const playersLabel = ['User', 'Computer'];
const scores = [0, 0];

// * Current player
let currentPlayer = 0;

// * Setup the game
const setup = () => {
  document.querySelector('.score-board #player-label0').innerHTML = playersLabel[0];
  document.querySelector('.score-board #player-score0').innerHTML = scores[0];
  document.querySelector('.score-board #player-label1').innerHTML = playersLabel[1];
  document.querySelector('.score-board #player-score1').innerHTML = scores[1];
  document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer] + '\'s turn';
  // Add event listeners to each cell
  document.querySelectorAll('#board .item').forEach((item) => {
    // Get the row and column of the clicked cell
    item.addEventListener('click', (e) => {
      // Make a move
      if (makeMove(Math.floor(e.target.value / 3), e.target.value % 3, currentPlayer)) {
        e.target.innerHTML = players[currentPlayer];
        // Check if the game is over
        if (isGameOver()) {
          // Check if there is a winner
          if (getWinner() !== null) {
            scores[currentPlayer]++;
            // Alert the winner
            alert(playersLabel[currentPlayer] + ' wins!');
          } else {
            // Alert that there is a draw
            alert('Draw!');
          }
          // Update the score board
          document.querySelector('.score-board #player-score' + currentPlayer).innerHTML = scores[currentPlayer];
          resetBoard();
        }
        else
          // Update the player status
          document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer = (currentPlayer === 0) ? 1 : 0] + '\'s turn';
      }
    });
    item.addEventListener('mouseover', (e) => {
      if (board[Math.floor(e.target.value / 3)][e.target.value % 3] === '')
        e.target.innerHTML = players[currentPlayer];
    });
    item.addEventListener('mouseout', (e) => {
      if (board[Math.floor(e.target.value / 3)][e.target.value % 3] === '')
        e.target.innerHTML = '';
    });
  });
  // Render the board
  renderBoard();
}

// * Render the board
const renderBoard = () => {
  // Iterate through each row in the board
  for (let i = 0; i < 3; i++)
    // Iterate through each cell in the current row
    for (let j = 0; j < 3; j++)
      // Set the current cell's text to the value in the board
      document.querySelectorAll('#board .item')[i*3 + j].innerHTML = board[i][j];
}

// * Reset the board
const resetBoard = () => {
  // Iterate through each row in the board
  for (let i = 0; i < 3; i++)
    // Iterate through each cell in the current row
    for (let j = 0; j < 3; j++)
      // Set the current cell's text to the value in the board
      board[i][j] = '';
  // Render the board
  renderBoard();
}

// * Make a move
const makeMove = (row, col, player) => {
  // Check if the move is valid
  if ((0 <= row) && (row < 3) && (0 <= col) && (col < 3)) {
    // Check if the cell is empty
    if (board[row][col] === '') {
      board[row][col] = players[player];
      return true;
    }
  }
  return false;
}

// * Check if a player has won
const isWinner = (player) => {
  // Check for horizontal and vertical wins
  for (let i = 0; i < 3; i++) {
    if (
      ((board[i][0] === player) && (board[i][1] === player) && (board[i][2] === player)) ||
      ((board[0][i] === player) && (board[1][i] === player) && (board[2][i] === player))
    ) return true;
  }
  // Check for diagonal wins
  if (
    ((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) ||
    ((board[0][2] === player) && (board[1][1] === player) && (board[2][0] === player))
  ) return true;
  return false;
}

// * Check if the board is full
const isFull = () => {
  // Iterate through each row in the board
  for (let i = 0; i < 3; i++)
    // Check if the current row includes an empty cell ('')
    if (board[i].includes('')) return false;
  return true;
}

// * Check if the game is over
const isGameOver = () => {
  // Check if a player has won or the board is full
  if (isWinner(players[0]) || isWinner(players[1]) || isFull()) return true;
  return false;
}

// * Get the winner
const getWinner = () => {
  // Check if a player has won
  if (isWinner(players[0])) return 0;
  if (isWinner(players[1])) return 1;
  return null;
}


// * Play the game
setup();