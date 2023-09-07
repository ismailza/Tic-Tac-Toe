// * Load saved games from local storage

// * Load all saved game sessions
const getAllSavedGameSessions = () => {
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = localStorage.getItem('Tic-Tac-Toe');
  if (!savedSessionsGroup)
    return {};
  else
    return JSON.parse(savedSessionsGroup);
};

// * Display all saved game sessions
const displayAllSavedGameSessions = () => {
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = getAllSavedGameSessions();
  // Display all saved sessions
  let savedSessions = document.getElementById('saved-sessions');
  // check if there is no saved sessions
  if (Object.keys(savedSessionsGroup).length === 0) savedSessions.innerHTML = '<p class="session-item">No saved sessions</p>';
  else {
    // Create a table of all saved sessions
    let table = document.createElement('table');
    // Create table header
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerHTML = 'Session';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Date';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Mode';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Player 1';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Player 2';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Current Player';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Action';
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);
    // Create table body
    let tbody = document.createElement('tbody');
    for (let session in savedSessionsGroup) {
      tr = document.createElement('tr');
      let td = document.createElement('td');
      td.innerHTML = session;
      tr.appendChild(td);
      td = document.createElement('td');
      td.innerHTML = savedSessionsGroup[session]['date'];
      tr.appendChild(td);
      td = document.createElement('td');
      td.innerHTML = savedSessionsGroup[session]['mode'];
      tr.appendChild(td);
      td = document.createElement('td');
      td.innerHTML = savedSessionsGroup[session]['playersLabel'][0];
      tr.appendChild(td);
      td = document.createElement('td');
      td.innerHTML = savedSessionsGroup[session]['playersLabel'][1];
      tr.appendChild(td);
      td = document.createElement('td');
      td.innerHTML = savedSessionsGroup[session]['currentPlayer'] === 0 ? savedSessionsGroup[session]['playersLabel'][0] : savedSessionsGroup[session]['playersLabel'][1];
      tr.appendChild(td);
      td = document.createElement('td');
      let button = document.createElement('button');
      button.setAttribute('class', 'btn btn-danger btn-sm');
      button.setAttribute('onclick', `deleteSavedGameSession('${session}')`);
      button.innerHTML = 'Delete';
      td.appendChild(button);
      button = document.createElement('button');
      button.setAttribute('class', 'btn btn-success btn-sm');
      button.setAttribute('onclick', `playSavedGameSession('${session}')`);
      button.innerHTML = 'Play';
      td.appendChild(button);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    savedSessions.appendChild(table);
  }
};

// * Delete a saved game session
const deleteSavedGameSession = (session) => {
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = getAllSavedGameSessions();
  // Delete the selected session
  delete savedSessionsGroup[session];
  // Save the updated saved sessions group to localStorage
  localStorage.setItem('Tic-Tac-Toe', JSON.stringify(savedSessionsGroup));
  // Reload the page
  location.reload();
};

// * Play a saved game session
const playSavedGameSession = (session) => {
  // Load existing saved sessions group from localStorage
  let savedSessionsGroup = getAllSavedGameSessions();
  // Selected session
  let selectedSession = savedSessionsGroup[session];
  // Save the selected session in localStorage
  localStorage.setItem('board', JSON.stringify(selectedSession.board));
  localStorage.setItem('scores', JSON.stringify(selectedSession.scores));
  localStorage.setItem('mode', selectedSession.mode);
  localStorage.setItem('difficulty', selectedSession.difficulty);
  localStorage.setItem('player1', selectedSession.playersLabel[0]);
  localStorage.setItem('player2', selectedSession.playersLabel[1]);
  localStorage.setItem('starts', selectedSession.currentPlayer);
  // Redirect to the game page
  window.location.href = 'index.html';
};

displayAllSavedGameSessions();