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
let dialLeftRotation = 0;
let dialRightRotation = 0;

// scroll setup
dialLeft.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY;
  dialLeftRotation += delta;
  dialLeft.style.transform = `rotate(${dialLeftRotation}deg)`;
  const newX = x + delta * .01;
  draw(newX, y);
});

dialRight.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY;
  dialRightRotation += delta;
  dialRight.style.transform = `rotate(${dialRightRotation}deg)`;
  const newY = y + delta * .01;
  draw(x, newY);
});

// arrow keys setup
document.addEventListener('keydown', (e) => {
  const step = 2;
  const dialRotationAmount = 10;
  switch (e.key) {
    case 'ArrowLeft':
      dialLeftRotation -= dialRotationAmount;
      dialLeft.style.transform = `rotate(${dialLeftRotation}deg)`;
      draw(x - step, y);
      break;
    case 'ArrowRight':
      dialLeftRotation += dialRotationAmount;
      dialLeft.style.transform = `rotate(${dialLeftRotation}deg)`;
      draw(x + step, y);
      break;
    case 'ArrowUp':
      dialRightRotation -= dialRotationAmount;
      dialRight.style.transform = `rotate(${dialRightRotation}deg)`;
      draw(x, y - step);
      break;
    case 'ArrowDown':
      dialRightRotation += dialRotationAmount;
      dialRight.style.transform = `rotate(${dialRightRotation}deg)`;
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
