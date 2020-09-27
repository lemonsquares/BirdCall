//pubnub ID
var dataServer;
var pubKey = 'pub-c-0f72a87a-27a8-4103-b9d0-b3647c112161';
var subKey = 'sub-c-b743d032-f84a-11ea-a11c-fa009153ffbc';
var channelName = 'theForest';
var dataToSend = {
x:0,
y:0,
squawk:0
}

var dataReceived = [];
var myId = "player2";
var playerTwo;
var playerOne;
var backgroundSprite;

var birdImg1;
var birdImg2;
var backgroundImg;
var squawkImg;


function preload() {


	birdImg1 = loadImage('assets/bird2.2.png');
	birdImg2 = loadImage('assets/bird1.2.png');
	// this background image is temp. it helps navigation because it has a grid.
	backgroundImg = loadImage('assets/green.png');
	// image for squawking still needs to be added. bush temp image
	squawkImg = loadImage('assets/bush4.png');

}

function setup() {

	createCanvas(800, 600);
	
	dataServer = new PubNub(
	{
	publish_key : pubKey,
	subscribe_key : subKey,
	ssl: true,
	uuid: myId
	});

	dataServer.subscribe({channels: [channelName]});
	dataServer.addListener({message: readIncoming});

    backgroundSprite = createSprite(0, 0, 5000, 5000);
    backgroundSprite.addImage(backgroundImg);

    playerTwo = createSprite(20, 20, 36, 32);
    playerTwo.addImage(birdImg1);

    // sets player 2 in random position depending on background size
    playerTwo.position.x = random(-500,500);
    playerTwo.position.y = random(-500,500);

    playerOne = createSprite(40, 30, 36, 32);
    playerOne.addImage(birdImg2);

    playerOne.position.x = -1000000;
    playerOne.position.y = 1000000;
}

function draw(){
		// spacebar
		if(keyIsDown('32')){
		var squawkSplash = createSprite(0, 0, 25, 25);
		squawkSplash.addImage(squawkImg);
		squawkSplash.position.x = playerTwo.position.x + -35;
		squawkSplash.position.y = playerTwo.position.y + -20;
  		//set a self destruction timer (life)
  		squawkSplash.life = 40;
  		sendSquawkPosition();
		}
		if(keyIsDown(LEFT_ARROW)){
			playerTwo.position.x = playerTwo.position.x - 6;
			sendLocalPosition();
		}
		if(keyIsDown(RIGHT_ARROW)){
			playerTwo.position.x = playerTwo.position.x + 6;
			sendLocalPosition();
		}
		if(keyIsDown(UP_ARROW)){
			playerTwo.position.y = playerTwo.position.y - 6;
			sendLocalPosition();
		}
		if(keyIsDown(DOWN_ARROW)){
			playerTwo.position.y = playerTwo.position.y + 6
			sendLocalPosition();
		}

//set the camera position to the player position
  camera.position.x = playerTwo.position.x;
  camera.position.y = playerTwo.position.y;

drawSprites();
}

function sendLocalPosition()
{
	//call pubnub here and send the X and Y coordiantes of playerTwo.position.x / playerTwo.position.y
	dataToSend.x = playerTwo.position.x;
	dataToSend.y = playerTwo.position.y;

	dataToSend.squawk = false; 

  // Send Data to the server to draw it in all other canvases
	dataServer.publish(
    {
      channel: channelName,
      message: dataToSend
    });
}
function sendSquawkPosition()
{
	//call pubnub here and send the X and Y coordiantes of playerTwo.position.x / playerTwo.position.y
	dataToSend.x = playerTwo.position.x;
	dataToSend.y = playerTwo.position.y;

	dataToSend.squawk = true; 

  // Send Data to the server to draw it in all other canvases
	dataServer.publish(
    {
      channel: channelName,
      message: dataToSend
    });
}
function readIncoming(inMessage){
  
  	if(inMessage.channel == channelName)
  	{
    	console.log(inMessage);
    	if (inMessage.publisher != myId)
    	{
			playerOne.position.x = inMessage.message.x;
			playerOne.position.y = inMessage.message.y;

		// This is where we need to add the squawk mechanic for players to find each other	
			if (inMessage.message.squawk){
				var squawkSplash = createSprite(0, 0, 25, 25);
		squawkSplash.addImage(squawkImg);
		squawkSplash.position.x = playerOne.position.x + -35;
		squawkSplash.position.y = playerOne.position.y + -20;
  		squawkSplash.life = 40;
				console.log('true');
			}

		} 
    }

}