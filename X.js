document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.onkeydown = function(e) {
  if (
    event.keyCode == 123 || // F12
    (event.ctrlKey && event.shiftKey && event.keyCode == 73) // Ctrl+Shift+I
  ) {
    return false;
  }
};