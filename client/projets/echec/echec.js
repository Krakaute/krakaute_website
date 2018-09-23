let plateau = [];
let noir = 40;
let blanc = 255-noir;
let rouge = [];
let vert = [];
let select = [];
let tour = 0;
let prom = 0;
let prompion;
let atteintB = [];
let atteintN = [];
let roque = [0, 0, 0, 0, 0, 0] //Tour00, Roi40, Tour70, Tour07, Roi47, Tour77

function setup() {
  createCanvas(1000, 1000);
  for (let i=0; i<8; i++){
    plateau.push([]);
    rouge.push([]);
    vert.push([]);
    atteintB.push([]);
    atteintN.push([]);
    for (let j=0; j<8; j++){
      plateau[i].push(0);
      rouge[i].push(0);
      vert[i].push(0);
      atteintB[i].push(0);
      atteintN[i].push(0);
    }
  }
  start(plateau);
}

function draw() {
  scale(windowHeight/800);
  background(255);

  for (let i=0; i<8; i++){
    for (let j=0; j<8; j++){
      if((i+j)%2==0){
        fill(255, 230, 140);
      }
      else{
        fill(150, 75, 50);
      }
      noStroke();
      rect(i*100, j*100, 100, 100);
      if (vert[i][j] == 1){
        fill(0, 255, 0, 150)
        rect(i*100, j*100, 100, 100);
      }
      if (rouge[i][j] == 1){
        fill(255, 0, 0, 150)
        rect(i*100, j*100, 100, 100);
      }
    }
    // atteint()
    // for (let i=0; i<8; i++){
    //   for (let j=0; j<8; j++){
    //     if(atteintB[i][j] == 1){
    //       fill(255, 255, 255);
    //       rect(i*100, j*100, 100, 100);
    //     }
    //     if(atteintN[i][j] == 1){
    //       fill(0, 0, 0);
    //       rect(i*100, j*100, 100, 100);
    //     }
    //   }
    // }
  }
  for (let i=0; i<8; i++){
    for (let j=0; j<8; j++){
      switch(plateau[i][j]){
        case 0:
          break;
        case 1:
          drawking(i*100, j*100, noir);
          break;
        case -1:
          drawking(i*100, j*100, blanc);
          break;
        case 2:
          drawqueen(i*100, j*100, noir);
          break;
        case -2:
          drawqueen(i*100, j*100, blanc);
          break;
        case 3:
          drawbishop(i*100, j*100, noir);
          break;
        case -3:
          drawbishop(i*100, j*100, blanc);
          break;
        case 4:
          drawknight(i*100, j*100, noir);
          break;
        case -4:
          drawknight(i*100, j*100, blanc);
          break;
        case 5:
          drawrook(i*100, j*100, noir);
          break;
        case -5:
          drawrook(i*100, j*100, blanc);
          break;
        case 6:
          drawpawn(i*100, j*100, noir);
          break;
        case -6:
          drawpawn(i*100, j*100, blanc);
          break;
        case 7:
          drawpawn(i*100, j*100, noir);
          break;
        case -7:
          drawpawn(i*100, j*100, blanc);
          break;
      }
    }
  }
  if(prom == 1){
    fill(255, 255, 255, 150);
    rect(50, 50, 700, 700);
    rect(150, 250, 100, 100);
    rect(350, 250, 100, 100);
    rect(550, 250, 100, 100);
    rect(250, 450, 100, 100);
    rect(450, 450, 100, 100);
    fill(0, 0, 0, 200);
    textAlign(CENTER, TOP);
    textSize(48);
    text("En quoi promouvoir le pion?", 400, 80);
    rouge[prompion[0]][prompion[1]] = 1;
    drawqueen(150, 250, 0);
    drawbishop(350, 250, 0);
    drawknight(550, 250, 0);
    drawrook(250, 450, 0);
    drawpawn(450, 450, 0);
  }
  test();
}

function mousePressed() {
  mod = 8/windowHeight;
  i = Math.trunc(mod*mouseX);
  j = Math.trunc(mod*mouseY);
  if(prom != 1){
    for (let k=0; k<8; k++){
      for (let l=0; l<8; l++){
        if(k!=i || l!=j){
          rouge[k][l]=0;
          vert[k][l]=0;
        }
      }
    }
    if(i<8 && j<8){
      if(!move(i, j, plateau, rouge, vert, select)){
        select = [i, j];
        possible(i, j, plateau, rouge, vert);
      }
    }
  }
  else{
    promotion(prompion[0], prompion[1], plateau);
    if(mod*mouseX*100>150 && mod*mouseX*100<250 && mod*mouseY*100>250 && mod*mouseY*100<350){
      plateau[prompion[0]][prompion[1]]=plateau[prompion[0]][prompion[1]]/Math.abs(plateau[prompion[0]][prompion[1]])*2;
      rouge[prompion[0]][prompion[1]] = 0;
      prom = 0;
    }
    if(mod*mouseX*100>350 && mod*mouseX*100<450 && mod*mouseY*100>250 && mod*mouseY*100<350){
      plateau[prompion[0]][prompion[1]]=plateau[prompion[0]][prompion[1]]/Math.abs(plateau[prompion[0]][prompion[1]])*3;
      rouge[prompion[0]][prompion[1]] = 0;
      prom = 0;
    }
    if(mod*mouseX*100>550 && mod*mouseX*100<650 && mod*mouseY*100>250 && mod*mouseY*100<350){
      plateau[prompion[0]][prompion[1]]=plateau[prompion[0]][prompion[1]]/Math.abs(plateau[prompion[0]][prompion[1]])*4;
      rouge[prompion[0]][prompion[1]] = 0;
      prom = 0;
    }
    if(mod*mouseX*100>250 && mod*mouseX*100<350 && mod*mouseY*100>450 && mod*mouseY*100<550){
      plateau[prompion[0]][prompion[1]]=plateau[prompion[0]][prompion[1]]/Math.abs(plateau[prompion[0]][prompion[1]])*5;
      rouge[prompion[0]][prompion[1]] = 0;
      prom = 0;
    }
    if(mod*mouseX*100>450 && mod*mouseX*100<550 && mod*mouseY*100>450 && mod*mouseY*100<550){
      plateau[prompion[0]][prompion[1]]=plateau[prompion[0]][prompion[1]]/Math.abs(plateau[prompion[0]][prompion[1]])*7;
      rouge[prompion[0]][prompion[1]] = 0;
      prom = 0;
    }
  }
}

function test(){
}

function start(plateau) {
  plateau[4][0] = 1;
  plateau[4][7] = -1;
  plateau[3][0] = 2;
  plateau[3][7] = -2;
  plateau[2][0] = 3;
  plateau[5][0] = 3;
  plateau[2][7] = -3;
  plateau[5][7] = -3;
  plateau[1][0] = 4;
  plateau[6][0] = 4;
  plateau[1][7] = -4;
  plateau[6][7] = -4;
  plateau[0][0] = 5;
  plateau[7][0] = 5;
  plateau[0][7] = -5;
  plateau[7][7] = -5;
  plateau[0][1] = 6;
  plateau[1][1] = 6;
  plateau[2][1] = 6;
  plateau[3][1] = 6;
  plateau[4][1] = 6;
  plateau[5][1] = 6;
  plateau[6][1] = 6;
  plateau[7][1] = 6;
  plateau[0][6] = -6;
  plateau[1][6] = -6;
  plateau[2][6] = -6;
  plateau[3][6] = -6;
  plateau[4][6] = -6;
  plateau[5][6] = -6;
  plateau[6][6] = -6;
  plateau[7][6] = -6;
}

function drawking(x, y, color){
  fill(color);
  rect(x+30, y+60, 40, 20);
  rect(x+40, y+20, 20, 40)
  rect(x+30, y+30, 40, 20)
  triangle(x+20, y+80, x+30, y+80, x+30, y+60);
  triangle(x+80, y+80, x+70, y+80, x+70, y+60);
}

function drawqueen(x, y, color){
  fill(color);
  rect(x+20, y+60, 60, 20);
  triangle(x+20, y+20, x+20, y+60, x+40, y+60);
  triangle(x+80, y+20, x+80, y+60, x+60, y+60);
  triangle(x+40, y+60, x+60, y+60, x+50, y+30);
  ellipse(x+50, y+30, 10, 10);
}

function drawbishop(x, y, color){
  fill(color);
  rect(x+30, y+60, 40, 20);
  triangle(x+20, y+80, x+30, y+80, x+30, y+60);
  triangle(x+80, y+80, x+70, y+80, x+70, y+60);
  ellipse(x+50, y+50, 30, 60);
  ellipse(x+50, y+20, 10);
  fill(128);
  quad(x+45, y+45, x+50, y+50, x+70-6, y+30+6, x+65-4, y+25+4);
}

function drawknight(x, y, color){
  fill(color);
  rect(x+30, y+60, 40, 20);
  triangle(x+20, y+80, x+30, y+80, x+30, y+60);
  triangle(x+80, y+80, x+70, y+80, x+70, y+60);
  quad(x+70, y+80, x+30, y+80, x+30, y+20, x+50, y+20);
  quad(x+70, y+30, x+30, y+20, x+30, y+50, x+70, y+50);
}

function drawrook(x, y, color){
  fill(color);
  rect(x+30, y+60, 40, 20);
  triangle(x+20, y+80, x+30, y+80, x+30, y+60);
  triangle(x+80, y+80, x+70, y+80, x+70, y+60);
  rect(x+35, y+20, 30, 40);
  rect(x+35, y+12, 6, 8);
  rect(x+59, y+12, 6, 8);
  rect(x+47, y+12, 6, 8);
}

function drawpawn(x, y, color){
  fill(color);
  rect(x+30, y+60, 40, 20);
  triangle(x+20, y+80, x+30, y+80, x+30, y+60);
  triangle(x+80, y+80, x+70, y+80, x+70, y+60);
  rect(x+42, y+30, 16, 40);
  triangle(x+42, y+30, x+42, y+60, x+38, y+60);
  triangle(x+58, y+30, x+58, y+60, x+62, y+60);
  ellipse(x+50, y+30, 25);
}

function possible(i, j, plateau, rouge, vert){
  let type = plateau[i][j];
  let sg = type/Math.abs(type);
  if(((tour%2)*2-1) == sg){
    function change(ni, nj){
      if(ni>=0 && nj>=0 && ni<8 && nj<8 && plateau[ni][nj]*sg<0){
        rouge[ni][nj]=1;
      }
      if(ni>=0 && nj>=0 && ni<8 && nj<8 && plateau[ni][nj]==0){
        vert[ni][nj]=1;
      }
    }
    switch(Math.abs(type)){
      case 0:
        break;
      case 1:
        for(let k=0; k<3; k++){
          for(let m=0; m<3; m++){
            if(k!=1 || m!=1){
              if(i+k-1 >= 0 && i+k-1 < 8 && j+m-1 >= 0 && j+m-1 < 8){
                let c = plateau[i+k-1][j+m-1];
                plateau[i+k-1][j+m-1] = 0;
                let cb = plateau[i][j];
                plateau[i][j] = 0;
                if((cb==1 && !roiNEchec(plateau, i+k-1, j+m-1)) || (cb==-1 && !roiBEchec(plateau, i+k-1, j+m-1))){
                  plateau[i+k-1][j+m-1] = c;
                  plateau[i][j] = cb;
                  change(i+k-1, j+m-1, sg);
                }
                plateau[i][j] = cb;
                plateau[i+k-1][j+m-1] = c;
              }
            }
          }
        }
        //Grand roque noir :
        if(type == 1 && roque[0] == 0 && roque[1] == 0 && plateau[1][0] == 0 && plateau[2][0] == 0 && plateau[3][0] == 0){
          if(!roiNEchec(plateau, 0, 0) && !roiNEchec(plateau, 1, 0) && !roiNEchec(plateau, 2, 0) && !roiNEchec(plateau, 3, 0) && !roiNEchec(plateau, 4, 0)){
            vert[1][0] = 1;
          }
        }
        //Petit roque noir :
        if(type == 1 && roque[2] == 0 && roque[1] == 0 && plateau[5][0] == 0 && plateau[6][0] == 0){
          if(!roiNEchec(plateau, 4, 0) && !roiNEchec(plateau, 5, 0) && !roiNEchec(plateau, 6, 0) && !roiNEchec(plateau, 7, 0)){
            vert[6][0] = 1;
          }
        }
        //Grand roque blanc :
        if(type == -1 && roque[3] == 0 && roque[4] == 0 && plateau[1][7] == 0 && plateau[2][7] == 0 && plateau[3][7] == 0){
          if(!roiBEchec(plateau, 0, 7) && !roiBEchec(plateau, 1, 7) && !roiBEchec(plateau, 2, 7) && !roiBEchec(plateau, 3, 7) && !roiBEchec(plateau, 4, 7)){
            vert[1][7] = 1;
          }
        }
        //Petit roque blanc :
        if(type == -1 && roque[5] == 0 && roque[4] == 0 && plateau[5][7] == 0 && plateau[6][7] == 0){
          if(!roiBEchec(plateau, 4, 7) && !roiBEchec(plateau, 5, 7) && !roiBEchec(plateau, 6, 7) && !roiBEchec(plateau, 7, 7)){
            vert[6][7] = 1;
          }
        }
        break;
      case 2:
        for(let k=0; k<3; k++){
          for(let m=0; m<3; m++){
            ni = 1-k;
            nj = 1-m;
            while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
              change(i+ni, j+nj, sg)
              ni+=1-k;
              nj+=1-m;
            }
            if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
              change(i+ni, j+nj, sg)
            }
          }
        }
        break;
      case 3:
        for(let k=0; k<2; k++){
          for(let m=0; m<2; m++){
            ni = 1-2*k;
            nj = 1-2*m;
            while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
              change(i+ni, j+nj, sg)
              ni+=1-2*k;
              nj+=1-2*m;
            }
            if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
              change(i+ni, j+nj, sg)
            }
          }
        }
        break;
      case 4:
        change(i+1, j+2, sg);
        change(i-1, j+2, sg);
        change(i+1, j-2, sg);
        change(i-1, j-2, sg);
        change(i+2, j+1, sg);
        change(i+2, j-1, sg);
        change(i-2, j+1, sg);
        change(i-2, j-1, sg);
        break;
      case 5:
        for(let k=0; k<4; k++){
          if(k==0){
            ni=1;
            nj=0;
          }
          if(k==1){
            ni=-1;
            nj=0;
          }
          if(k==2){
            ni=0;
            nj=1;
          }
          if(k==3){
            ni=0;
            nj=-1;
          }
          while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
            change(i+ni, j+nj, sg)
            if(k==0){
              ni++;
            }
            if(k==1){
              ni--;
            }
            if(k==2){
              nj++;
            }
            if(k==3){
              nj--;
            }
          }
          if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
            change(i+ni, j+nj, sg)
          }
        }
        break;
      case 6:
      case 7:
        if((j==1 && sg>0) || (j==6 && sg<0)){
          if(i+1>=0 && j+sg>=0 && i+1<8 && j+sg<8 && plateau[i+1][j+sg]*sg<0){
            rouge[i+1][j+sg]=1;
          }
          if(i-1>=0 && j+sg>=0 && i-1<8 && j+sg<8 && plateau[i-1][j+sg]*sg<0){
            rouge[i-1][j+sg]=1;
          }
          if(i>=0 && j+sg>=0 && i<8 && j+sg<8 && plateau[i][j+sg]*sg==0){
            vert[i][j+sg]=1;
            if(i>=0 && j+2*sg>=0 && i<8 && j+2*sg<8 && plateau[i][j+2*sg]*sg==0){
              vert[i][j+2*sg]=1;
            }
          }
        }
        else{
          if(i+1>=0 && j+sg>=0 && i+1<8 && j+sg<8 && plateau[i+1][j+sg]*sg<0){
            rouge[i+1][j+sg]=1;
          }
          if(i-1>=0 && j+sg>=0 && i-1<8 && j+sg<8 && plateau[i-1][j+sg]*sg<0){
            rouge[i-1][j+sg]=1;
          }
          if(i>=0 && j+sg>=0 && i<8 && j+sg<8 && plateau[i][j+sg]*sg==0){
            vert[i][j+sg]=1;
          }
        }
        break;
    }
  }
}

function change(ni, nj, sg){
  if(ni>=0 && nj>=0 && ni<8 && nj<8 && plateau[ni][nj]*sg<0){
    rouge[ni][nj]=1;
  }
  if(ni>=0 && nj>=0 && ni<8 && nj<8 && plateau[ni][nj]==0){
    vert[ni][nj]=1;
  }
}

function move(i, j, plateau, rouge, vert, select){
  // let c = plateau[i][j];
  // plateau[i][j] = 0;
  // if((rouge[i][j] != 1 && vert[i][j] != 1) || (plateau[select[0]][select[1]]==1 && roiNEchec(plateau, i, j)) || (plateau[select[0]][select[1]]==-1 && roiBEchec(plateau, i, j))){
  if(rouge[i][j] != 1 && vert[i][j] != 1){
    // plateau[i][j] = c;
    vert[i][j]=0;
    rouge[i][j]=0;
    return false;
  }
  //Grand roque noir
  else if (select[0] == 4 && select[1] == 0 && plateau[select[0]][select[1]] == 1 && roque[0] == 0 && roque[1] == 0 && i == 1 && j == 0) {
    plateau[i][j] = plateau[select[0]][select[1]];
    plateau[select[0]][select[1]] = 0;
    plateau[0][0] = 0;
    plateau[2][0] = 5;
    roque[0] = 1;
    roque[1] = 1;
    vert[0][0] = 0;
    vert[1][0] = 0;
    tour++;
  }
  //Petit roque noir
  else if (select[0] == 4 && select[1] == 0 && plateau[select[0]][select[1]] == 1 && roque[2] == 0 && roque[1] == 0 && i == 6 && j == 0) {
    plateau[i][j] = plateau[select[0]][select[1]];
    plateau[select[0]][select[1]] = 0;
    plateau[7][0] = 0;
    plateau[5][0] = 5;
    roque[2] = 1;
    roque[1] = 1;
    vert[7][0] = 0;
    vert[6][0] = 0;
    tour++;
  }
  //Grand roque blanc
  else if (select[0] == 4 && select[1] == 7 && plateau[select[0]][select[1]] == -1 && roque[3] == 0 && roque[4] == 0 && i == 1 && j == 7) {
    plateau[i][j] = plateau[select[0]][select[1]];
    plateau[select[0]][select[1]] = 0;
    plateau[0][7] = 0;
    plateau[2][7] = -5;
    roque[3] = 1;
    roque[4] = 1;
    vert[0][7] = 0;
    vert[1][7] = 0;
    tour++;
  }
  //Petit roque blanc
  else if (select[0] == 4 && select[1] == 7 && plateau[select[0]][select[1]] == -1 && roque[5] == 0 && roque[4] == 0 && i == 6 && j == 7) {
    plateau[i][j] = plateau[select[0]][select[1]];
    plateau[select[0]][select[1]] = 0;
    plateau[7][7] = 0;
    plateau[5][7] = -5;
    roque[5] = 1;
    roque[4] = 1;
    vert[7][7] = 0;
    vert[6][7] = 0;
    tour++;
  }
  else{
      // plateau[i][j] = c;
    if(vert[i][j]==1){
      plateau[i][j] = plateau[select[0]][select[1]];
    }
    if(rouge[i][j]==1){
      plateau[i][j] = plateau[select[0]][select[1]];
    }
    plateau[select[0]][select[1]] = 0;
    vert[i][j]=0;
    rouge[i][j]=0;
    tour++;
    if(select[0] == 0 && select[1] == 0){
      roque[0] = 1;
    }
    if(select[0] == 4 && select[1] == 0){
      roque[1] = 1;
    }
    if(select[0] == 7 && select[1] == 0){
      roque[2] = 1;
    }
    if(select[0] == 0 && select[1] == 7){
      roque[3] = 1;
    }
    if(select[0] == 4 && select[1] == 7){
      roque[4] = 1;
    }
    if(select[0] == 7 && select[1] == 7){
      roque[5] = 1;
    }
    if(Math.abs(plateau[i][j]) == 6 && (j == 0 || j == 7)){
      promotion(i, j, plateau);
    }
    return true;
  }
}

function promotion(i, j, plateau){
  prom = 1;
  prompion = [i, j]
}

function roiNEchec(plateau, i=-1, j=-1){
  if(i==-1 || j==-1){
    i=-1;
    j=-1;
    for(let k=0; k<8; k++){
      for(let l=0; l<8; l++){
        if (plateau[k][l] == 1){
          i=k;
          j=l;
        }
      }
    }
    if(i==-1 || j==-1){
      console.log("Le roi noir est échec et mat! Le joueur blanc gagne");
    }
  }
  if(i!=-1 && j!=-1){
    atteint();
    if(atteintB[i][j] == 1){
      return true;
    }
    else{
      return false;
    }
  }
}

function roiBEchec(plateau, i=-1, j=-1){
  if(i==-1 || j==-1){
    i=-1;
    j=-1;
    for(let k=0; k<8; k++){
      for(let l=0; l<8; l++){
        if (plateau[k][l] == -1){
          i=k;
          j=l;
        }
      }
    }
    if(i==-1 || j==-1){
      console.log("Le roi blanc est échec et mat! Le joueur noir gagne");
    }
  }
  if(i!=-1 && j!=-1){
    atteint();
    if(atteintN[i][j] == 1){
      return true;
    }
    else{
      return false;
    }
  }
}

function atteint(){
  for (let i=0; i<8; i++){
    for (let j=0; j<8; j++){
      atteintB[i][j] = 0;
      atteintN[i][j] = 0;
    }
  }
  for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
      type = plateau[i][j];
      sg = type/Math.abs(type);
      if(type!=0){
        if(type>0){
          att=atteintN;
        }
        else{
          att=atteintB;
        }
        switch(Math.abs(type)){
          case 1:
            changeatteint(i-1, j-1, att, sg);
            changeatteint(i, j-1, att, sg);
            changeatteint(i+1, j-1, att, sg);
            changeatteint(i-1, j+1, att, sg);
            changeatteint(i, j+1, att, sg);
            changeatteint(i+1, j+1, att, sg);
            changeatteint(i-1, j, att, sg);
            changeatteint(i+1, j, att, sg);
            break;
          case 2:
            for(let k=0; k<3; k++){
              for(let m=0; m<3; m++){
                ni = 1-k;
                nj = 1-m;
                while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
                  changeatteint(i+ni, j+nj, att, sg);
                  ni+=1-k;
                  nj+=1-m;
                }
                if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
                  changeatteint(i+ni, j+nj, att, sg);
                }
              }
            }
            break;
          case 3:
            for(let k=0; k<2; k++){
              for(let m=0; m<2; m++){
                ni = 1-2*k;
                nj = 1-2*m;
                while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
                  changeatteint(i+ni, j+nj, att, sg)
                  ni+=1-2*k;
                  nj+=1-2*m;
                }
                if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
                  changeatteint(i+ni, j+nj, att, sg);
                }
              }
            }
            break;
          case 4:
            changeatteint(i+1, j+2, att, sg);
            changeatteint(i-1, j+2, att, sg);
            changeatteint(i+1, j-2, att, sg);
            changeatteint(i-1, j-2, att, sg);
            changeatteint(i+2, j+1, att, sg);
            changeatteint(i+2, j-1, att, sg);
            changeatteint(i-2, j+1, att, sg);
            changeatteint(i-2, j-1, att, sg);
            break;
          case 5:
            for(let k=0; k<4; k++){
              if(k==0){
                ni=1;
                nj=0;
              }
              if(k==1){
                ni=-1;
                nj=0;
              }
              if(k==2){
                ni=0;
                nj=1;
              }
              if(k==3){
                ni=0;
                nj=-1;
              }
              while(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg==0){
                changeatteint(i+ni, j+nj, att, sg);
                if(k==0){
                  ni++;
                }
                if(k==1){
                  ni--;
                }
                if(k==2){
                  nj++;
                }
                if(k==3){
                  nj--;
                }
              }
              if(i+ni<8 && j+nj<8 && i+ni>=0 && j+nj>=0 && plateau[i+ni][j+nj]*sg<0){
                changeatteint(i+ni, j+nj, att, sg);
              }
            }
            break;
          case 6:
          case 7:
            changeatteint(i-1, j+sg, att, sg);
            changeatteint(i+1, j+sg, att, sg);
            break;
        }
      }
    }
  }
}

function changeatteint(i, j, att, sg){
  if(i>=0 && j>=0 && i<8 && j<8 && plateau[i][j]*sg<=0){
    att[i][j]=1;
  }
}
