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
// let leftAngle = 0;
// let rightAngle = 0;
// let leftDragging = false;
// let rightDragging = false;
//
// function getMovement(dial, mouseX, mouseY) {
//   const bounds = dial.getBoundingClientRect();
//   const centerX = bounds.left + bounds.width / 2;
//   const centerY = bounds.top + bounds.height / 2;
//   const deltaX = mouseX - centerX;
//   const deltaY = mouseY - centerY;
//   return Math.atan2(deltaY, deltaX);
// }
//
// dialLeft.addEventListener('mousemove', (e) => {
//   leftDragging = true;
//   leftAngle = getMovement(dialLeft, e.clientX, e.clientY);
// });
//
// dialLeft.addEventListener('mouseup', () => {
//   leftDragging = false;
// });
//
// dialRight.addEventListener('mousemove', (e) => {
//   rightDragging = true;
//   rightAngle = getMovement(dialRight, e.clientX, e.clientY);
// });
//
// dialRight.addEventListener('mouseup', () => {
//   rightDragging = false;
// });
//
//
// document.addEventListener('mousemove', (e) => {
//   if (leftDragging) {
//     const newLeftAngle = getMovement(dialLeft, e.clientX, e.clientY);
//     const leftDelta = newLeftAngle - leftAngle;
//
//     const newX = x + leftDelta;
//     draw(newX, y);
//
//     leftAngle = newLeftAngle;
//   }
//
//   if (rightDragging) {
//     const newRightAngle = getMovement(dialRight, e.clientX, e.clientY);
//     const rightDelta = newRightAngle - rightAngle;
//
//     const newY = y + rightDelta;
//     draw(x, newY);
//
//     rightAngle = newRightAngle;
//   }
// });
//
// document.addEventListener('mouseup', () => {
//   leftDragging = false;
//   rightDragging = false;
// });

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
