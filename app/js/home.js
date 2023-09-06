// *

document.getElementsByName('mode').forEach((radio) => {
  radio.addEventListener('click', () => {
    if (radio.value === 'user-computer') {
      document.querySelector('#difficulty').classList.remove('hidden');
      document.querySelectorAll('#players-name .input-wrapper')[1].classList.add('hidden');
    }
    else {
      document.querySelector('#difficulty').classList.add('hidden');
      document.querySelectorAll('#players-name .input-wrapper')[1].classList.remove('hidden');
    }
  });
});

document.getElementById('start-btn').addEventListener('click', () => {
  // Check if the players' names are empty
  document.getElementsByName('mode').forEach((radio) => {
    // if mode is user-computer, check player 1's name
    if (radio.checked && radio.value === 'user-computer') {
      if (document.getElementById('player1-name').value === '') {
        alert('Please enter player 1\'s name');
        return;
      }
    }
    // if mode is user-user, check both players' names
    else if (radio.checked && radio.value === 'user-user') {
      if (document.getElementById('player1-name').value === '' || document.getElementById('player2-name').value === '') {
        alert('Please enter the players\' names');
        return;
      }
    }
  });
  // Get game configuration and save it in localStorage
  // Get mode
  const mode = document.querySelector('input[name="mode"]:checked').value;
  localStorage.setItem('mode', mode);
  if (mode === 'user-computer') {
    // Get difficulty
    const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('player2', 'Computer');
  }
  else if (mode === 'user-user') {
    const player2 = document.getElementById('player2-name').value;
    localStorage.setItem('player2', player2);
  }
  const player1 = document.getElementById('player1-name').value;
  localStorage.setItem('player1', player1);
  // Get hwo starts
  const starts = document.querySelector('input[name="starts"]:checked').value;
  localStorage.setItem('starts', starts);
  // Redirect to game page
  window.location.href = 'index.html';
});