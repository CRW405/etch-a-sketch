// canvas setup
const canvas = document.getElementById('canvas');
const width = canvas.width;
const height = canvas.height;
let x = width / 2;
let y = height / 2;

// brush setup
const brush = canvas.getContext('2d');
brush.strokeStyle = 'black';
brush.lineWidth = 2;
brush.lineCap = 'round';
brush.beginPath();
brush.moveTo(x, y);

function draw(newX, newY) {
  brush.lineTo(newX, newY);
  brush.stroke();
  x = newX;
  y = newY;
}

// dial setup
const dialLeft = document.getElementById('dial-left');
const dialRight = document.getElementById('dial-right');

// scroll setup
dialLeft.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY;
  dialLeft.style.transform = `rotate(${delta}deg)`;
  const newX = x + delta * .01;
  draw(newX, y);
});

dialRight.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY;
  dialRight.style.transform = `rotate(${delta}deg)`;
  const newY = y + delta * .01;
  draw(x, newY);
});

// arrow keys setup
document.addEventListener('keydown', (e) => {
  const step = 2;
  switch (e.key) {
    case 'ArrowLeft':
      draw(x - step, y);
      break;
    case 'ArrowRight':
      draw(x + step, y);
      break;
    case 'ArrowUp':
      draw(x, y - step);
      break;
    case 'ArrowDown':
      draw(x, y + step);
      break;
  }
});

const etchasketch = document.getElementById('etch-a-sketch');

function shake() {
  brush.clearRect(0, 0, width, height);
  brush.beginPath();
  etchasketch.style.animation = 'shake 0.5s';
  setTimeout(() => {
    etchasketch.style.animation = '';
  }, 500);
}
