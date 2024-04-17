const A = { x: 100, y: 100 };
const B = { x: 400, y: 300 };
const M = { x: 250, y: 250 }

myCanvas.addEventListener("mousemove", (event) => {
  M.x = event.offsetX;
  M.y = event.offsetY;
  redrawAll();
})

myCanvas.addEventListener("click", (event) => {
  A.x = event.offsetX;
  A.y = event.offsetY;
  redrawAll();
})

// right click
myCanvas.addEventListener("contextmenu", (event) => {
  B.x = event.offsetX;
  B.y = event.offsetY;
  redrawAll();
  event.preventDefault();
})

redrawAll()

function redrawAll() {
  clear();
  drawDot(A, "A");
  drawDot(B, "B");
  drawDot(M, "M");
  drawSegment(A, B);
  const result = distanceFromPointToSegment(M, A, B);
  drawText(result.value);
  drawArrow(result.point, M);

  // drawArrow(A);
  // drawArrow(B);
  // drawArrow(M);
}

function distanceFromPointToSegment(M, A, B) {
  const { point, t } = projectPointToSegment(M, A, B);
  drawDot(point, 'point');
  // if along the segment, we know the distance
  if ( t > 0 && t < 1) {
    return { point: point, value: distance(M, point) };
  } else {
    // handle cases when point is not on segment
    const distToA = distance(M, A);
    const distToB = distance(M, B);
    if (distToA < distToB) {
      return { point: A, value: distToA };
    } else {
      return { point: B, value: distToB };
    }
  }
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
