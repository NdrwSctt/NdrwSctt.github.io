var eSize = 10;
var workerSize;
var eReSize;
var posX, posY;
var aNote = 'black';
var bNote = 'black';
var aPosX, aPosY;
var bizName = ''

function setup() {
  createCanvas(3500, 3500);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(95);

  eReSize = eSize * 5;
  if (eSize > height) {
    eReSize = eSize;
    workerSize = 1;
    aNote = 'black';
    bNote = 'black';
    posY = height / 2;
    posX = width / 2;
    aPosY = height / 2;
    aPosX = width / 2;
    function calculateEllipseArea(a, b) {
      return Math.PI * a * b;
    }

    function calculatePercentageOutsideCanvas(canvasWidth, canvasHeight, ellipseDiameter) {
      var canvasArea = canvasWidth * canvasHeight;
      var ellipseRadius = ellipseDiameter / 2;
      var ellipseArea = calculateEllipseArea(ellipseRadius, ellipseRadius);

      var percentageOutside = ((ellipseArea - canvasArea) / ellipseArea) * 100;
      return percentageOutside.toFixed(2); // Round to 2 decimal places
    }

    var canvasWidth = 3000;
    var canvasHeight = 3000;
    var ellipseDiameter = eSize;

    var percentageOutside = calculatePercentageOutsideCanvas(canvasWidth, canvasHeight, ellipseDiameter);
    console.log('Percentage outside canvas:', percentageOutside + '%');

  } else {
    workerSize = 5;
    aNote = color(0, 0, 0, 0);
    bNote = color(0, 0, 0, 0);
  }
  if (eReSize > height) {
    eReSize = eSize;
    workerSize = 1;
    aNote = 'black';
    posY = height / 2;
    posX = width / 2;
    aPosY = height / 2;
    aPosX = width / 2;
  } else {
    workerSize = 5;
    aNote = color(0, 0, 0, 0);
    bNote = color(0, 0, 0, 0);
  }
  if (eReSize > 2 * windowHeight) {
    // workerSize = 5;
    posY = height / 2;
    posX = width / 2;
    aPosY = height / 2;
    aPosX = width / 2;
  } else if (eReSize > windowHeight) {
    // workerSize = 5;
    var visibleHeight = windowHeight / 4;
    var visibleWidth = visibleHeight;
    posY = windowHeight - visibleHeight / 2;
    posX = windowWidth - visibleWidth / 2;
    aPosY = windowHeight / 2;
    aPosX = windowWidth / 2;
  } else {
    posY = windowHeight / 2;
    posX = windowWidth / 2;
    aPosY = posY + eReSize / 4;
    aPosX = posX - eReSize / 2;
    // workerSize = 5;
    // aNote = color(0, 0, 0, 0);
    aPosY = (windowHeight / 2) + (eReSize/3);
    aPosX = (windowWidth / 2) - (eReSize/2);
  }

  conicGradient(
    0, posX, posY,//Start angle, pX, pY
    [
      color(0, 100, 100, 100),
      color(10, 100, 100, 100),
      color(20, 100, 100, 100),
      color(30, 100, 100, 100)
    ]
  );
  // fill('red')
  noStroke()
  ellipse(posX, posY, eReSize, eReSize);


  fill('blue');
  ellipse(aPosX, aPosY, workerSize, workerSize);


  fill(aNote);
  textAlign(CENTER);
  textSize(10);
  text('(Pixel Represents Employee)' + '\n' + '↓', aPosX, aPosY - 20);

  fill(bNote);
  textAlign(CENTER);
  textSize(10);
  text(100 - Math.round(percentageOutside) + '% of CEO portion visable', aPosX, aPosY - 35);

  fill('black');
  textAlign(LEFT); // Set text alignment to LEFT and CENTER
  textSize(10);
  textWrap(WORD);
  var textX = aPosX - textWidth(bizName) / 10; // Calculate the x-coordinate for centered alignment
  text(bizName, textX, aPosY + 15, 220);
  shadow();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function conicGradient(sA, cX, cY, colors){
  let gradient = drawingContext.createConicGradient(
    sA, cX, cY
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.fillStyle = gradient;
}

function shadow(){
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}
