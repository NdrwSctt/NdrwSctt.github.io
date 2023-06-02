// BEGIN OUTLINING (AND OPTIONALLY WRITING) THE CODE FOR YOUR CLOCK
  // write the code in draw()
  // you only need to write instructions in English
  //  outline (step-by-step/ line-by-line) how you think your clock needs to work with code
  // you can also try to begin coding--that is, writing your code in JavaScript/P5
  // but the most important thing is to outline in as much detail as possible
  // feel free to cut-and-paste modified examples from the clock_examplesAndDraft files

//COMMENTS
  // remember, you can comment and uncomment a whole block of text
  // by selecting the text and pressing command / (mac) or control / (windows)

let frequencies = [349.23, 440, 261.63, 311.13, 698.46, 880, 523.26, 622.26, 1047.69, 1320, 784.89, 311.13];
let randomX = [];
let randomY = [];
let osc = [];
let polySynth = [];
let playSound = false;
var volHistory = [];
var ampLevels = [];

function setup() {
//   this line sets up the canvas that will be drawn on
// this makes it the size of the browser
// this is the only time you should use windowWidth,windowHeight
// after creating the canvas, use width and height
  let cnv = createCanvas(windowWidth,windowHeight)
  //get those 60 random points one time, before draw() starts looping
   for(let i=0; i<24;i++) {
      randomX.push(random(width));
      randomY.push(random(height)); //top half of the screen
   }
  angleMode(DEGREES);
  cnv.mousePressed(playSynth);
  for (let i=0; i<13;i++) {
    osc[i] = new p5.Oscillator();
    osc[i].freq(0);
    osc[i].setType('sawtooth');
    osc[i].amp(0.5);
    osc[i].start();
    osc[i].stop(); 
  }
  osc12 = new p5.Oscillator();
  osc12.setType('sin');
  osc12.amp(0.5);
  amp = new p5.Amplitude();
}

///MINUTES
function playSynth() {
  userStartAudio();

  // note duration (in seconds)
  let dur = .20;

  // velocity (volume, from 0 to 1)
  let vel = 0.9;
 
  let x = minute();
  let y = second();

  polySynth = new p5.PolySynth();
    for (let p = 0; p < x; p++) {
      polySynth.play('F3', vel, p * 0.5, dur);
    }  
    // for (let s = 0; s < y; s++) {
    //   polySynth.play('C3', vel, s * 0.5, dur);
    // }  
}
///MINUTES END


///DRAW START
function draw() {
  let timeString = hour() + ":" + minute() + ":" + second()
  //console.log(timeString)

let a = hour()*10
let b = minute()*10
let c = second()*10

  background(a, b, c)
  textSize(50)
  fill(0)
  //this time string is to help you debug...comment it out in your final submission
    //text(timeString,500,100)
  
// WRITE YOUR CODE OUTLINE (AND JAVASCRIPT/P5 HERE)


///VISUALIZER START
var vol = amp.getLevel();
volHistory.push(vol);
stroke(800)
fill(c*2, a, b);

for (let h = 0; h <= hour() - 1; h++){

  push();
  translate(randomX[h], randomY[h]);
  beginShape();
  for (let v = 0; v < 360; v++){
    var r = map(volHistory[v], 0, 1, 12, 2);
    var x = r * 5 * cos(v);
    var y = r * 5 * sin(v);
    //var y = map(volHistory[i], 0, 1, height, 0);
    vertex(x,y);
  }
  endShape();
  pop();
}

if (volHistory.length > 360) {
  volHistory.splice(0,1);
}
///VISUALIZER END
currentHour = hour()%12
///HOURS FREQUENCIES
if (hour() >= 6 && hour() <= 18){
  osc[0].freq(349.23);
  }
if (hour() >= 7 && hour() <= 19){
  osc[1].freq(440);
  }
// if (hour() >= 7){
//   osc[1].freq(440);
//   }else{
//     hour() >= 19
//   }
if (hour() >= 8 && hour() <= 20){
  osc[2].freq(261.63);
  }  
// if (hour() >= 8){
//   osc[2].freq(261.63);
//   }else{
//     hour() >= 20
//   }  
if (hour() >= 9 && hour() <= 21){
  osc[3].freq(311.13);
  }    
// if (hour() >= 9){
//   osc[3].freq(311.13);
//   }else{
//     hour() >= 21
//   }
if (hour() >= 10 && hour() <= 22){
  osc[4].freq(698.46);
  }    
// if (hour() >= 10){
//   osc[4].freq(698.46);
//   }else{
//     hour() >= 22
//   }
if (hour() >= 11 && hour() <= 23){
  osc[5].freq(880);
  }   
// if (hour() >= 11){
//   osc[5].freq(880);
//   }else{
//     hour() >= 23
//   }
if (hour() >= 12 && hour() <= 0){
  osc[6].freq(523.26);
  }   
// if (hour() >= 12){
//   osc[6].freq(523.26);
//   }else{
//     hour() >= 0
//   }
if (hour() >= 13 || hour() >= 0 && hour() <= 1){
  osc[7].freq(622.26);
  }    
// if (hour() >= 13 || hour() === 0){
//   osc[7].freq(622.26);
//   }else{
//     hour() >= 1
//   }
if (hour() >= 14 || hour() >= 0 && hour() <= 2){
  osc[8].freq(1047.69);
  }  
// if (hour() >= 14 || hour() >= 0){
//   osc[8].freq(1047.69);
//   }else{
//     hour() >= 2
//   }
if (hour() >= 15 || hour() >= 0 && hour() <= 3){
  osc[9].freq(1320);
  }    
// if (hour() >= 15 || hour() >= 0){
//   osc[9].freq(1320);
//   }else{
//     hour() >= 3
//   }
if (hour() >= 16 || hour() >= 0 && hour() <= 4){
  osc[10].freq(784.89);
  }     
// if (hour() >= 16 || hour() >= 0){
//   osc[10].freq(784.89);
//   }else{
//     hour() >= 4
//   }
if (hour() >= 17 || hour() >= 0 && hour() <= 5){
  osc[11].freq(311.13);
  }    
// if (hour() >= 17 || hour() >= 0){
//   osc[11].freq(311.13);
//   }else{
//     hour() >= 5
//   }                 
///HOURS FREQUENCIES END


///SECONDS
if (playSound) {
  let frequency = map(second(), 0, 59, 220, 880);
    osc12.setType('sin');
    osc12.freq(frequency);
  }
///SECONDS END


}
///DRAW END

function mousePressed() {
  playSound = true;
  for (let i = 0; i < 13; i++) {
    osc[i].start();
    setTimeout(() => {
      osc[i].stop();
      osc12.stop();
      polySynth.disconnect()
    }, 30000);
  }
  osc12.start();
}


