


let mic;
let msgNum=1;
 function setup(){
  let cnv = createCanvas(200, 200);
  cnv.mousePressed(startRecording);
  textAlign(CENTER);
}

function startRecording(){
  mic = new p5.AudioIn();
  mic.start();
}

function draw(){

  background(111);
  fill(255);
  if(mic){
  micLevel = mic.getLevel();
  if(micLevel>0.15){
    console.log(`baby is crying!!!${msgNum}`);
    msgNum+=1;
    console.log(msgNum)
  }
  let y = micLevel * (height*0.95);
  ellipse(width/2, height/2, y, y);}
  else{
    ellipse(width/2, height/2, 100, 100);
  }
  fill(0)
  text('Monitor', width/2, height/2);
}