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

  const { point, t } = projectPointToSegment(M, A, B);
  drawDot(point, 'point');
}

function projectPointToSegment(M, A, B) {
  const AB = subtract(B, A);
  const AM = subtract(M, A);
  const nAB = normalize(AB);
  const t = dot(AM, nAB) / distance(A, B);
  const scaler = dot(AM, nAB);
  const point = add(A, scale(nAB, scaler));
  return { point, t };
}

// ----------- before refactor -------------- //
// function projectPointToSegment(M, A, B) {
//   const AB = subtract(B, A);
//   drawArrow(add(AB, A), A);

//   const AM = subtract(M, A);
//   drawArrow(add(AM, A), A);

//   // scaling by the inverse of it's length
//   // const nAB = normalize(AB);
//   // const nAM = normalize(AM);
//   // drawArrow(add(nAM, A), A);

//   // displays the direction relative to the current segment
//   // const t = dot(nAM, nAB);
//   // drawText(t);

//   // scaling by the inverse of it's length
//   const nAB = normalize(AB);

//   // displays the distance from point A
//   // to the its projected point along the segment
//   const t = dot(AM, nAB) / distance(A, B);
//   // to project a point
//   const scaler = dot(AM, nAB);
//   drawText(t);

//   // gets a point between A and B that is t% away from A using linear interpolation
//   // const point = lerp2D(A, B, t);
//   // drawDot(point, 'point');

//   // gets a point between A and B that is t% away from A
//   const point = add(A, scale(nAB, scaler));
//   drawDot(point, 'point');
// }
