var two;
function Player2(){

	two = createSprite(500,500);
	two.addImage(loadImage('assets/box.png'));
	two.setCollider('rectangle',-2,2,400,300);
}
