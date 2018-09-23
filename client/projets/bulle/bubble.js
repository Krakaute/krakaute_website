let bubble = []
let nombre = 1000
let rmax = 100

class Bubble{
	constructor(x, y){
		this.id = 0;
		this.x = x;
		this.y = y;
		this.r = 50;
	}
	show(){
		fill(map(this.r, 0, 100, 0, 255), map(this.x, 0, windowWidth, 0, 255), map(this.y, 0, windowHeight, 0, 255))
		ellipse(this.x, this.y, this.r);
	}
	changeRadius(){
		this.r += random(-1*map(bubble.length, 0, nombre, 0, 5), map(bubble.length, 0, nombre, 5, 0));
	}
	move(){
		this.x += random(-10, 10);
		this.y += random(-10, 10);
	}
	clicked(x, y){
		if(Math.abs(dist(x, y, this.x, this.y))<this.r){
			bubble.splice(this.id, 1)
		}
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	bubble[0] = new Bubble(windowWidth/2, windowHeight/2);
}

function draw() {
	background(map(bubble.length, 0, nombre, 0, 255))
	if(bubble.length == 0){
		bubble[0] = new Bubble(windowWidth/2, windowHeight/2);
	}
	for (j=0;j<bubble.length;j++){
		bubble[j].move();
		bubble[j].changeRadius();
		bubble[j].show();
		bubble[j].id = j
		if(bubble[j].r > rmax && bubble.length<=nombre){
			bubble.push(new Bubble(bubble[j].x, bubble[j].y));
			bubble[j].r = 50
		}
		if(bubble[j].r < 0 || bubble[j].x<0 || bubble[j].y<0 || bubble[j].x>windowWidth || bubble[j].y>windowHeight){
			bubble.splice(j, 1)
		}
	}
}

function mousePressed(){
	for (let bubl of bubble){
		bubl.clicked(mouseX, mouseY)
		for (j=0;j<bubble.length;j++){
			bubble[j].id = j
		}
	}
}
