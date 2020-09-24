function preload() {

}

function setup() {
	createCanvas(windowWidth, windowHeight);

	// This is a link to player1.js && player2.js
	playerOne = new Player1();

	playerTwo = new Player2();
}

function draw(){

// resets the scene to prevent mouse drawing
clear();
background(0);

one.position.x = mouseX;
one.position.y = mouseY;

//two.position.x = mouseX;
//two.position.y = mouseY;

if (one.collide(two)){
	console.log('HI');
}

two.collide(one);

// preview colliders
one.debug = mouseIsPressed;
two.debug = mouseIsPressed;

drawSprites();
}