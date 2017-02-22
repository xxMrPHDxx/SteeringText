var font;
var currentPoints;

var vehicles = [];

var input;
var intext;

var randomizer;

function preload(){
  font = loadFont('OpenSans-ExtraBold.ttf');
}

function setup() {
  input = document.querySelector('#submit');
  intext = document.querySelector('#text');
  randomizer = document.querySelector('#rand');
  
  createCanvas(1000,1000);
  background(51);
  
  currentPoints = font.textToPoints('train',40,200,192);
  
  for(var i=0;i<currentPoints.length;i++){
    var pt= currentPoints[i];
    var vehicle = new Vehicle(pt.x,pt.y);
    vehicles.push(vehicle);
  }
  
  input.setAttribute('onclick','retext()');
}

function draw() {
  background(51);
  for(var i=0;i<vehicles.length;i++){
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.draw();
  }
}

function retext(){
  var textValue = intext.value; 
  var textArray = textValue.split(" ");
  
  var rand = randomizer.checked;
  
  var points = [];
  for(var i=0;i<textArray.length;i++){
	var tempPoints = font.textToPoints(textArray[i],40,200 + 220 * i,192);
	points = points.concat(tempPoints);
  }
  var d = points.length - vehicles.length;
  if(d < 0){
    var d = vehicles.length - points.length;
    for(var i=vehicles.length-1;i>=0;i--){
      if(i-d<0){
        vehicles.splice(i,1);
      }else{
        if(!rand)vehicles[i].newTarget(points[i - d].x,points[i - d].y);
		else vehicles[i] = new Vehicle(points[i - d].x,points[i - d].y);
      }
    }
  }else if(d > 0){
    for(var i=points.length-1;i>=0;i--){
      if(vehicles.length - i < d){
        vehicles.push(new Vehicle(points[i].x,points[i].y));
      }else{
        if(!rand)vehicles[i].newTarget(points[i].x,points[i].y);
		else vehicles[i] = new Vehicle(points[i].x,points[i].y);
      }
    }
  }else{
    for(var i=points.length-1;i>=0;i--){
      if(!rand)vehicles[i].newTarget(points[i].x,points[i].y);
	  else vehicles[i] = new Vehicle(points[i].x,points[i].y);
    }
  }
}