const A = { x: 100, y: 100 };
const B = { x: 400, y: 300 };
const M = { x: 250, y: 250 }

myCanvas.addEventListener("mousemove", (event) => {
  M.x = event.offsetX;
  M.y = event.offsetY;
  redrawAll();
})

redrawAll()

function redrawAll() {
  clear();
  drawDot(A, "A");
  drawDot(B, "B");
  drawDot(M, "M");
  drawSegment(A, B);

  // drawArrow(A);
  // drawArrow(B);
  // drawArrow(M);

  projectPointToSegment(M, A, B);
}

function projectPointToSegment(M, A, B) {
  const AB = subtract(B, A);
  drawArrow(add(AB, A), A);

  const AM = subtract(M, A);
  drawArrow(add(AM, A), A);

  // scaling by the inverse of it's length
  const nAB = normalize(AB);
  const nAM = normalize(AM);
  drawArrow(add(nAM, A), A);

  // displays the direction relative to the current segment
  const t = dot(nAM, nAB);
  drawText(t);

}
