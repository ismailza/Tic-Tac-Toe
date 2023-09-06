// * Script for Tic-Tac-Toe game

// * Board
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// * Players
const players = ['X', 'O'];
// * Players' labels
const playersLabel = [localStorage.getItem('player1'), localStorage.getItem('player2')];
// * Players' scores
const scores = [0, 0];

// * Current player
let currentPlayer = parseInt(localStorage.getItem('starts'));

// * Setup the game
const setup = () => {
  document.querySelector('.score-board #player-label0').innerHTML = playersLabel[0];
  document.querySelector('.score-board #player-score0').innerHTML = scores[0];
  document.querySelector('.score-board #player-label1').innerHTML = playersLabel[1];
  document.querySelector('.score-board #player-score1').innerHTML = scores[1];
  document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer] + '\'s turn';
  // Add event listeners to each cell
  document.querySelectorAll('#board .item').forEach((item) => {
    // Check if the mode is user-computer and it's the computer's turn
    if ((localStorage.getItem('mode') !== 'user-computer') || (currentPlayer === 0)) {
      // Get the row and column of the clicked cell
      item.addEventListener('click', (e) => {
        // Make a move
        if (makeMove(Math.floor(e.target.value / 3), e.target.value % 3, currentPlayer)) {
          // Make the move
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
          else {
            // Update the player status
            document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer = (currentPlayer === 0) ? 1 : 0] + '\'s turn';
            setTimeout(() => computerTurn(), 10);
          }
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
    }
    else {
      setTimeout(() => computerTurn(), 10);
    }
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

// * Minimax algorithm
const minimax = (board, depth, isMaximizing) => {
  // Check if the game is over
  if (isGameOver()) {
    // Check if there is a winner
    if (getWinner() !== null) {
      // Return the score
      return (getWinner() === 0) ? -10 + depth : 10 - depth;
    }
    // Return 0 if there is a draw
    return 0;
  }
  // Check if the current player is maximizing
  if (isMaximizing) {
    // Initialize the best score
    let bestScore = -Infinity;
    // Iterate through each row in the board
    for (let i = 0; i < 3; i++) {
      // Iterate through each cell in the current row
      for (let j = 0; j < 3; j++) {
        // Check if the current cell is empty
        if (board[i][j] === '') {
          // Make a move
          board[i][j] = players[1];
          // Get the score for the current move
          let score = minimax(board, depth + 1, false);
          // Undo the move
          board[i][j] = '';
          // Check if the current score is better than the best score
          if (score > bestScore) {
            // Update the best score
            bestScore = score;
          }
        }
      }
    }
    // Return the best score
    return bestScore;
  }
  // Check if the current player is minimizing
  else {
    // Initialize the best score
    let bestScore = Infinity;
    // Iterate through each row in the board
    for (let i = 0; i < 3; i++) {
      // Iterate through each cell in the current row
      for (let j = 0; j < 3; j++) {
        // Check if the current cell is empty
        if (board[i][j] === '') {
          // Make a move
          board[i][j] = players[0];
          // Get the score for the current move
          let score = minimax(board, depth + 1, true);
          // Undo the move
          board[i][j] = '';
          // Check if the current score is better than the best score
          if (score < bestScore) {
            // Update the best score
            bestScore = score;
          }
        }
      }
    }
    // Return the best score
    return bestScore;
  }
}

// * Get the best move for the computer
const getBestMove = () => {
  // Initialize the best score
  let bestScore = -Infinity;
  // Initialize the best move
  let bestMove = {row: -1, col: -1};
  // Iterate through each row in the board
  for (let i = 0; i < 3; i++) {
    // Iterate through each cell in the current row
    for (let j = 0; j < 3; j++) {
      // Check if the current cell is empty
      if (board[i][j] === '') {
        // Make a move
        board[i][j] = players[1];
        // Get the score for the current move
        let score = minimax(board, localStorage.getItem('difficulty'), false);
        // Undo the move
        board[i][j] = '';
        // Check if the current score is better than the best score
        if (score > bestScore) {
          // Update the best score
          bestScore = score;
          // Update the best move
          bestMove.row = i;
          bestMove.col = j;
        }
      }
    }
  }
  // Return the best move
  return bestMove;
}

// * Computer's turn
const computerTurn = () => {
  // Get the best move
  const bestMove = getBestMove();
  // Make a move
  makeMove(bestMove.row, bestMove.col, 1);
  // Render the board
  renderBoard();
  // Check if the game is over
  if (isGameOver()) {
    // Check if there is a winner
    if (getWinner() !== null) {
      scores[1]++;
      // Alert the winner
      alert(playersLabel[1] + ' wins!');
    } else {
      // Alert that there is a draw
      alert('Draw!');
    }
    // Update the score board
    document.querySelector('.score-board #player-score1').innerHTML = scores[1];
    resetBoard();
    setTimeout(() => computerTurn(), 10);
  }
  else {
    // Update the player status
    document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer = (currentPlayer === 0) ? 1 : 0] + '\'s turn';
  }
}

// * Restart the game
document.querySelector('#restart-btn').addEventListener('click', () => {
  // Reset the scores
  scores[0] = 0;
  scores[1] = 0;
  // Update the score board
  document.querySelector('.score-board #player-score0').innerHTML = scores[0];
  document.querySelector('.score-board #player-score1').innerHTML = scores[1];
  // Reset the board
  resetBoard();
  // Update the player status
  document.querySelector('.player-status #status').innerHTML = playersLabel[currentPlayer = parseInt(localStorage.getItem('starts'))] + '\'s turn';
  // Check if the mode is user-computer and it's the computer's turn
  if ((localStorage.getItem('mode') === 'user-computer') && (currentPlayer === 1)) {
    setTimeout(() => computerTurn(), 10);
  }
});

// * Save the game
document.querySelector('#save-btn').addEventListener('click', () => {
  // Enter a name for the session
  do {
    var sessionName = prompt('Enter a name for the session:');
    if (sessionName === null) return;
    if (sessionName.trim() === '') alert('Session name cannot be empty. Please enter a valid name.');
  } while (sessionName.trim() === '');
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = localStorage.getItem('Tic-Tac-Toe');
  if (!savedSessionsGroup)
    savedSessionsGroup = {};
  else
    savedSessionsGroup = JSON.parse(savedSessionsGroup);
  // Save the game with the entered session name in the group
  const gameState = {
    name: sessionName,
    board: board,
    currentPlayer: currentPlayer,
    scores: scores,
    playersLabel: playersLabel,
    mode: localStorage.getItem('mode'),
    difficulty: localStorage.getItem('difficulty'),
    date: new Date()
  };
  savedSessionsGroup[sessionName] = gameState;
  // Store the updated group back in localStorage
  localStorage.setItem('Tic-Tac-Toe', JSON.stringify(savedSessionsGroup));
  // Alert that the game has been saved
  alert('Game saved!');
});

// * Load all saved game sessions
const getAllSavedGameSessions = () => {
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = localStorage.getItem('Tic-Tac-Toe');
  if (!savedSessionsGroup)
    return {};
  else
    return JSON.parse(savedSessionsGroup);
};


// * Play the game
setup();