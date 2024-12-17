const socket = io();
const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();

  // Emit drawing event to other clients
  socket.emit('drawing', {
    x: e.offsetX,
    y: e.offsetY,
    lastX,
    lastY
  });

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

// Local drawing events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Remote drawing events
socket.on('drawing', (data) => {
  context.beginPath();
  context.moveTo(data.lastX, data.lastY);
  context.lineTo(data.x, data.y);
  context.stroke();
});