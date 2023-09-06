
// * Check configuration in localStorage
if (localStorage.getItem('mode') === null) {
  // Redirect to home page
  window.location.href = 'home.html';
}