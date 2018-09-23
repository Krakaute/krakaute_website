let J1_score;
let J2_score;
let tour;
let mPX;
let mPY;
let mcase;
let grille;
let gagnant;
let myinp;

function croix(centerX, centerY, size, alpha){
	stroke(247, 35, 12, alpha);
	line(centerX-size/2, centerY+size/2, centerX+size/2, centerY-size/2);
	line(centerX+size/2, centerY+size/2, centerX-size/2, centerY-size/2);
	stroke(0);
}

function rond(centerX, centerY, size, alpha){
	noFill();
	stroke(30, 127, 203, alpha);
	ellipse(centerX, centerY, size, size)
	stroke(0);
	fill(0);
}

function coordToCase(x, y) {
	x-=100;
	y-=100;
	x=Math.trunc(x/150)+1;
	y=Math.trunc(y/150);
	return x+3*y;
}

function setup() {
	var canvas = createCanvas(1000, 650);
	canvas.parent('jumbo-canvas')
	//Init des variables
	J1_score = 0;
	J2_score = 0;
	tour = 0;
	mPX = 0;
	mPY = 0;
	mcase = 0;
	grille = [0, 0, 0, 0, 0, 0, 0, 0, 0]
	gagnant = 0;
}

function draw() {
	background(200);
	//Grille
	strokeWeight(4);
	line(100, 250, 550, 250);
	line(100, 400, 550, 400);
	line(250, 100, 250, 550);
	line(400, 100, 400, 550);
	//Texte
	noStroke();
	textSize(48);
	textAlign(LEFT);
	text("J1   J2", 780, 100);
	text("Score :", 600, 160);
	text("Tour : " + Math.trunc(tour/2+1), 600, 230)
	text("J" + (tour%2+1) + " joue!", 600, 300)
	textAlign(CENTER);
	text(J1_score, 800, 160);
	text(J2_score, 900, 160);
	stroke(0);
	//Juste de la déco
	croix(806, 83, 50, 50);
	rond(899, 83, 50, 50);
	//On dessine les croix et rond
	for(k=0; k<9; k++){
		let x=0;
		let y=0;
		i=k+1
		if(i==1){
			x=1
			y=1
		}
		if(i==2){
			x=2
			y=1
		}
		if(i==3){
			x=3
			y=1
		}
		if(i==4){
			x=1
			y=2
		}
		if(i==5){
			x=2
			y=2
		}
		if(i==6){
			x=3
			y=2
		}
		if(i==7){
			x=1
			y=3
		}
		if(i==8){
			x=2
			y=3
		}
		if(i==9){
			x=3
			y=3

		}
		if(grille[k]==1){
			croix(x*150+25,y*150+25, 100, 255)
		}
		if(grille[k]==2){
			rond(x*150+25,y*150+25, 100, 255)
		}
	}
  //Test de victoire
	if(grille[0] == grille[1] && grille[1] == grille[2] && grille[0]!=0){
		gagnant = grille[0];
	}
	if(grille[3] == grille[4] && grille[4] == grille[5] && grille[3]!=0){
		gagnant = grille[3];
	}
	if(grille[6] == grille[7] && grille[7] == grille[8] && grille[6]!=0){
		gagnant = grille[6];
	}
	if(grille[0] == grille[3] && grille[3] == grille[6] && grille[0]!=0){
		gagnant = grille[0];
	}
	if(grille[1] == grille[4] && grille[4] == grille[7] && grille[1]!=0){
		gagnant = grille[1];
	}
	if(grille[2] == grille[5] && grille[5] == grille[8] && grille[2]!=0){
		gagnant = grille[2];
	}
	if(grille[0] == grille[4] && grille[4] == grille[8] && grille[0]!=0){
		gagnant = grille[0];
	}
	if(grille[2] == grille[4] && grille[4] == grille[6] && grille[2]!=0){
		gagnant = grille[2];
	}
	if(gagnant!=0){
		grille = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		tour = 0;
		mcase = 0;
		if(gagnant == 1){
			J1_score++;
		}
		if(gagnant == 2){
			J2_score++;
		}
		gagnant = 0;
	}
	if(grille[0]!=0 && grille[1]!=0 && grille[2]!=0 && grille[3]!=0 && grille[4]!=0 && grille[5]!=0 && grille[6]!=0 && grille[7]!=0 && grille[8]!=0){
		grille = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		tour = 0;
		mcase = 0;
		gagnant = 0;
	}
  //Chat
  fill(220);
  noStroke();
  rect(570, 320, 400, 300);
  fill(0)
  stroke(0);
  //Croix et rond qui suivent la souris
  if(tour%2+1 == 1){
    croix(mouseX, mouseY, 100, 100);
  }
  if(tour%2+1 == 2){
    rond(mouseX, mouseY, 100, 100);
  }
}

function mousePressed() {
	mPX = mouseX
	mPY = mouseY
	if (mPX > 100 && mPX < 550 && mPY > 100 && mPY < 550){
		mcase = coordToCase(mPX, mPY);
		mcase--;
		if (grille[mcase]==0){
			grille[mcase]=tour%2+1;
			tour++;
		}
	}
}
