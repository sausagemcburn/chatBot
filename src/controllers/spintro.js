
let sizeX = 1920;
let sizeY = 1080;

// title shwag
let x_txt0 = sizeX/4 - 22;
let y_txt0 = sizeY/2 + 40;
let char_sp = 77;
let change_P = 1;

// rotate speed (deg/s)
let rs = 1;
let angle = 0;

function preload() {
	myFont = loadFont("../src/resources/cqmono.otf");
}

function setup() {
	createCanvas(sizeX, sizeY, WEBGL);
	noStroke();
	textFont(myFont, 160);
	title = new Title('sausagemcburn', char_sp, x_txt0, y_txt0, change_P);  
}

function draw() {
	background(0);
	rotateY(angle);
	angle += rs;
	title.drawSelf();
}
