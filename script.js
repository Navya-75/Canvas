const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const toolSelect = document.getElementById('toolSelect');

let painting = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', stop);

function start(e) {
  painting = true;
  draw(e);
}

function stop() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const tool = toolSelect.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  if (tool === 'pencil') {
    ctx.lineWidth = 2;
    ctx.globalAlpha = 1;
  } else if (tool === 'marker') {
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.4;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}
