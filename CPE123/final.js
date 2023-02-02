
let x = [];
let y = [];
let s = [];
let starNum = 300;

//spaceship moving variables
// position
var xSS = 0; 
var ySS = 150;
// velocity
var dxSS = 1;
var dySS = 0;
// acceleration
var accX = 0;
var accY = 0;
// direction
var unitX = 1;
var unitY = 0;

// more spaceship variables
var rotSS = 0;
var scalSS = .1;
var tSS = 255;


// star vars
let strX = [];
let strY = [];
let strC = [];
let strS = [];
let strR = [];

let strNum = 100;

var count = 0;

// asteroid vars
let Astx = [];
let Asty = [];
let Astdx = [];
let Astdy = [];
let Asts = [];
let amouNum = 6;

let buttonclicked = false;


let f = 200;

let clicked = false;

let moonClicked = false;
let r = 0;

let planetClicked = false;
let size = 1;
let sizeNum = .2

function setup() {
  createCanvas(400, 400);
  
  for (let i = 0; i < starNum; i++) {
    x[i] = random(width);
    y[i] = random(height);
    s[i] = random(0.1, 1);
  }
  
// stars
   for (let i = 0; i < strNum; i++)
   {
      strX[i] = random(width);
      strY[i] = random(height);
      strC[i] = color(random(245, 255), random(240, 255), random(0, 255));
      strS[i] = random(.5, 1.5);
      strR[i] = random(PI);
   }

//astroids  
  for (let i = 0; i < amouNum; i++)
      {
        Astx[i] = random(width);
        Asty[i] = random(height);

        Astdx[i] = random(-3, 3);
        Astdy[i] = random(-3, 3);

        Asts[i] = random(.25, 1);
       }  
  
}


function draw() {
  scene1();
  
  if (clicked) {
    scene2();
  }
  
}

function stars() {
  for (let i = 0; i < starNum; i++) {
    strokeWeight(0);
    fill(255, 246, 179);
    push();
      translate(x[i], y[i]);
      scale(s[i]);
      ellipse(0, 0, 3);
    pop();
  }
}

function drawMoon(x, y, s) {
  push();
    translate(x, y);
    scale(s);
    rotate(r);
    fill(255, 254, 209);
    ellipse(0, 0, 70);

    fill(214, 213, 161);
    ellipse(10, -20, 20);
    ellipse(-20, -15, 10);  
    ellipse(-10, 15, 25);
    ellipse(25, 0, 15);
    ellipse(18, 18, 8);
  pop();
}

function drawRingPlanet(x, y, s) {
  push();
    translate(x, y);
    scale(s);
  
    push();
      rotate(PI / 8);
      noFill();
      stroke(128, 255, 255);
      strokeWeight(5);
      arc(0, 0, 100, 20, PI, 8 * PI / 4);
    pop();
  
    fill(59, 5, 255);
    ellipse(0, 0, 50);

    push();
      rotate(PI / 8);
      noFill();
      stroke(128, 255, 255);
      strokeWeight(5);
      arc(0, 0, 100, 20, 8 * PI / 4, 4 * PI / 4);
    pop();
  pop();
}

function drawGlowPlanet(x, y, s, r, g, b) {
  push();
    translate(x, y);
    scale(s);
    fill(r, g, b, 75);
    ellipse(0, 0, 85);
    fill(r, g, b, 90);
    ellipse(0, 0, 70);
    fill(r, g, b);
    ellipse(0, 0, 55);
  pop();
}

function drawInsideRocket(x,y)
{
  push();
    
    strokeWeight(1);
    translate(200,200);
  
    fill(220);
    rect(-200, 50, 400, 200);

    fill(255);
    ellipse (0,50,400,50);

    //left
    fill(255)
    rect (-200,40,120,100,10);
    fill(0)
    rect (-190,50,100,80,10);

    //middle
    fill(255)
    rect (-75,20,150,100,10);
    fill(0)
    rect (-65,30,130,80,10);
    //middle target
    fill(20,200,20) //green
    ellipse (0,68,60,60)
    // fill(200,20,20)
    // ellipse (0,68,20,20)
  
    fill(0); 
    ellipse(0,68,20,20);

    if (f > 0){
      fill(200,20,20); //red
      ellipse(0,68,20,20);
      f = f - 20;
    }

    else if (f == 0){
      f = f + 200;
    }



    //right
    fill(255)
    rect (80,40,120,100,10);
    fill(0)
    rect (90,50,100,80,10);

    //table
    fill(150,10,250)
    beginShape();
    vertex (-70,130)
    vertex (70,130)
    vertex (90,180)
    vertex (-90,180)
    endShape();

    //screenontable
    fill(0)
    scale(.75)
    beginShape();
    vertex (-75,180)
    vertex (75,180)
    vertex (90,230)
    vertex (-90,230)
    endShape();

    //buttons on table
    fill(200,20,120)
    ellipse(65,195,10,10)
    ellipse(50,195,10,10)
    ellipse(35,195,10,10)
    fill(10,60,200)
    rect(-60,185,60,40)


    //chair
    fill(180,10,230)
    rect(-290,120,200,200,20)
    rect(100,120,200,200,20)

  pop();  
}

function scene1() {
  background(0, 0, 64);
  
  stars();
  
  drawRingPlanet(100, 80, 1);
  
  drawGlowPlanet(310, 100, 1, 255, 111, 0);
  
  drawMoon(200, 150, 1);
  
  drawInsideRocket();

  if (moonClicked) {
    r += PI / 8;
  }

  if (planetClicked) {
    size -= sizeNum;
  }

  if (size <= .1) {
    sizeNum = -.2;
  }
  else if (size >= 1) {
    sizeNum = 0;
  }
}

function scene2() {
  
//Spaceship
   backgroundScene(); 
   drawSpaceship(xSS, ySS, dxSS, dySS, scalSS, tSS);
   checkKeys();
   updateSpaceship();
   count++;
  
//asteroids 
    if (buttonclicked)
    { 
      drawAsteroids();
      updateAsteroids();
    }  
   drawButton();
}

//keys for spaceship
// press up down or right to change
function checkKeys()
{
   // x speed
   if (keyIsDown(40)) // space key//flames.
   {
      accX = .1; 
   } 
   else if (keyIsDown(RIGHT_ARROW))//flames
   {  
      accX = .3;
   }
   else
   {
      if (accX > 0) //slow
      {
         accX = -.3; 
      }
      else if (dxSS <= 1) //reset
      {
         accX = 0
         dxSS = 1;
      }
   }

   // y speed
   if (keyIsDown(UP_ARROW)) //flames
   {
      unitY = -2;
      accY = .2;
   }
   else if (keyIsDown(DOWN_ARROW)) //flames
   {
      unitY = 2;
      accY = .2;
   }
   else 
   {
      unitY = 0;
      accY = 0;
      dySS = 0;
   }

}


function backgroundScene()
{
   // sky
   background(0,0,64); //dark blue
  
   drawStrs();
   updateStrs();

}

function drawSpaceship(x, y, dx, dy, sc)
{
   push();
      translate(x, y);
      rotate(atan2(dy, dx) + PI / 2);
      scale(sc);
      noStroke();

        translate(0, 225);
    //space body
        fill(255);
        ellipse(0, 0, 350, 700);
  
    //space smaller body
        fill(150);
        ellipse(0, 0, 250, 500);
     
        translate(-330, 490);
    //space wings
        triangle(0, 0, 330, -620, 660, 100);
  
    //space window
        fill(0);
        ellipse(330, -600, 180, 150);
  
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || (keyIsDown(32)))
    {
  
     //Flame1
        fill(255,0,0); //red
        ellipse(330, 250, 80, 490);
     //Flame2
        fill(250, 200, 0); //orange
        ellipse(230, 170, 60, 250);
      //Flame3
        fill(250, 200, 0); //orange
        ellipse(450, 170, 60, 250);
    }
 
   pop();
}


function updateSpaceship()
{
   //move spaceship
   dxSS += unitX * accX;
   dySS += unitY * accY;

   xSS += dxSS;
   ySS += dySS;

   if (xSS > width)
   {
      xSS = 0;
   }

   
}



function drawStrs()
{
   for (let i = 0; i < strNum; i++)
   {
      fill(strC[i]);
      push();
         translate(strX[i], strY[i]);
         scale(strS[i]);
         rotate(strR[i]);
        noStroke();
  beginShape();
  vertex(-2, 2);
  vertex(0, 10);
  vertex(2, 2);
  vertex(10, 0);
  vertex(2, -1);
  vertex(0, -10);
  vertex(-2, -1);
  vertex(-10, 0);
  endShape();
      pop();
   }
}

function updateStrs() //twinkle
{
   for (let i = 0; i < strNum; i++)
   {
      strS[i] += random(-.02, .02);
      if (strS[i] > 1)
      {
         strS[i] = 1;
      }
   }
}


//Astroid funtions
function drawAsteroids()
{
   for (let i = 0; i < amouNum; i++)
   {
      drawAsteroid(Astx[i], Asty[i], Astdx[i], Astdy[i], Asts[i]);
   }
}

function drawAsteroid(x, y, dx, dy, s)
{
   let spaceColor = color(82,30,30); //brown

   push();
      translate(x, y);
      rotate(atan2(dy, dx) + 0);
      scale(s);

      fill(spaceColor);
      // rock shape
    stroke(0); // black
    strokeWeight(2);
    beginShape();
      curveVertex(-75, -55);
      curveVertex(0, -80); 
      curveVertex(35, -55); 
      curveVertex(20, 0);
      curveVertex(-20, 0); 
      curveVertex(-45, -55); 
      curveVertex(0, -80); 
      curveVertex(55, -55); 
  
    endShape();
   pop();
}

function updateAsteroids()
{
  
   for (let i = 0; i < amouNum; i++)
   {
      Astx[i] += Astdx[i];
      Asty[i] += Astdy[i];

       if (Astx[i] < 0  || Astx[i] > width)
      {
      Astx[i]=random(width);
      }

      if (Asty[i] < 0 || Asty[i] > height)
      {
      Asty[i]=random(height);
      }

   }
}


 function mouseClicked() {
   if (mouseX > 170 && mouseX < 230 && mouseY > 238 && mouseY < 298) {
     clicked = true;
   }
   
//    if (______) {
//      moonClicked = !moonClicked;
//    }

//    if (______) {
//      planetClicked = !planetClicked;
//    }
 

  // click on text box
  if (mouseX > 50 && mouseX < 50 + 135 && mouseY > 50 && mouseY < 100)
  {
    if (buttonclicked) // reset
    {
      for (let i = 0; i < amouNum; i++)
   {
      drawAsteroid(Astx[i], Asty[i], Astdx[i], Astdy[i]); 
          Astx[i] = 100;
          Asty[i] = 100;
          // Astdx[i] = 0;
          // Astdy[i] = 0;
   }
     }
     buttonclicked = !buttonclicked;
     console.log("sup");

  }
  
}


function drawButton()
{
  push();

    //Start and Stop
    fill(0);
    noStroke();
    rect(60, 50, 105, 50);

    noStroke();
    fill(255,0,0);
    textSize(30);

    if (buttonclicked)
    {

        text("Stop", 80, 85); 
    }
    else{
        text("Start", 80, 85); 
    }
  
  pop();
}