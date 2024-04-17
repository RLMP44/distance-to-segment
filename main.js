const A = { x: 100, y: 100 };
const B = { x: 400, y: 300 };
const M = { x: 250, y: 250 }

myCanvas.addEventListener("mousemove", (event) => {
  M.x = event.offsetX;
  M.y = event.offsetY;
  redrawAll();
})

function redrawAll() {
  clear();
  drawDot(A, "A");
  drawDot(B, "B");
  drawDot(M, "M");
  drawSegment(A, B);
}
