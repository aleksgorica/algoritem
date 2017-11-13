let box1 = [];
let box2 = [];
let box01 = [];
let box01a = [];
let box02 = [];
let box02a = [];
let polje = [[],[]];
let a = false;
//***************************************************************
function setup(){
  createCanvas(640,480);
  start();
  $("#gumb").click(function(){
    razvrsti()
  });
  $("#razvrsti").click(function(){
    mix();
      });
  $("#onfield").click(function(){
    onfield();
    a = true;
     $(this).attr('disabled','disabled');
        });
  $("#razporedi").click(function(){
    razporedi();
  })
  $("#tobox").click(function(){
    tobox();
    $("#onfield").removeAttr("disabled");
  });
}
//**********************************************************************
function draw(){
    background(0);
  display(box01,box02, 20,width-20);
  display(polje[0],polje[1],width/3,width/3*2);
}

//**********************************************************
function Fizol(color, num){
  this.color = color;
  this.num = num;
}

function start(){
  let wh = prompt("koliko belih");
  let bl = prompt("koliko crnih");
    box1 = [];
  for(let i = 0; i < wh; i++){
    let f = new Fizol("white", i);
    box1.push(f);
    console.log(box1[i].color);
  }
  box2 = [];
  for(let i = 0; i < bl; i++){
    let b = new Fizol("black", i + Number(wh));
    box2.push(b);
    console.log(box2[i].color);
  }
}

function razvrsti(){
  if((box1.length + box2.length) % 2 != 0){
    start();
  }
  box01 = box1.filter(function (value, index, ar) {
      return (index % 2 == 0);
  } );
  box02 = box1.filter(function(value, index, ar) {
      return ((index + 1) % 2 == 0);
  });

  box01a = box2.filter(function(value, index, ar) {
      return ((index + 1) % 2 == 0);
  });

  box02a = box2.filter(function(value, index, ar) {
      return (index % 2 == 0);
  });

  box01 = box01.concat(box01a);
  box02 = box02.concat(box02a);
//    if(box1.length % 2 > 0){
//      box01.push(box1[length]);
//    }
box1.splice(0,box1.length);//if(box2.length%2 != 0){
//  box02.push(box2[length]);
//}
box2.splice(0,box2.length);
  console.log("box01");
  box01.forEach(function(current){
    console.log(current.color);
  });
  console.log("box02");
  box02.forEach(function(currentb){
    console.log(currentb.color);
  });
}

function mix(){
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  shuffleArray(box01);
  shuffleArray(box02);
  console.log("zacetek");
  box01.forEach(function(cur){
    console.log(cur.color);
  });
}

function onfield(){
  polje[0] = box01;
  polje[1] = box02;
  box01 = [];
  box02 = [];
}

function razporedi(){
  let poljef = [[],[]];
  polje[0].forEach(function(cur,index,arr){
    if(arr[index].color == polje[1][index].color && cur.color == "white"){
          poljef[0].push(cur);
          poljef[1].push(polje[1][index]);
    }
  });
  polje[0].forEach(function(cur,index,arr){
    if(arr[index].color == polje[1][index].color && cur.color == "black"){
          poljef[0].push(cur);
          poljef[1].push(polje[1][index]);
    }
  });
  polje[0].forEach(function(cur,index,arr){
    if(arr[index].color != polje[1][index].color){
          poljef[0].push(cur);
          poljef[1].push(polje[1][index]);
    }
  });
  polje = poljef;
}

function tobox(){
  for(let i = 0; i < polje[0].length; i++){
  box01.push(polje[0][2*i], polje[1][2*i]);
  box02.push(polje[0][2*i+1], polje[1][2*i+1]);
  }
  box01 = box01.filter(function(e){return e});
  box02 = box02.filter(function(e){return e});
  if(polje[0].length % 2 != 0){
  box01.pop();
  box01.pop();
  box01.push(polje[0][polje[0].length-1]);
  box02.push(polje[1][polje[0].length-1]);
}

  polje[0] = [];
  polje[1] = [];
  console.log("tobox deluje");
}

function display(whatone,whattwo, x1, x2){
  function nic(whatone,x1){
    let x = x1
    let y = 10;
  for(let i = 0; i < whatone.length; i++){
    if(whatone[i].color == "white"){
      fill(255);
      ellipse(x,y, 30,20);
      fill(255,0,0);
      text(whatone[i].num, x, y, 70,80);
    }
    if(whatone[i].color == "black"){
      fill(0,0,125);
      ellipse(x,y, 30,20);
      fill(255,0,0);
      text(whatone[i].num, x, y, 70,80);
    }
    y = y + 30;
  }
}
  function ena(whattwo,x2){
    let x = x2;
    let y = 10;
  for(let i = 0; i < whattwo.length; i++){

  if(whattwo[i].color == "white"){
    fill(255);
    ellipse(x,y, 30,20);
    fill(255,0,0);
    text(whattwo[i].num, x, y, 70,80);
  }
  if(whattwo[i].color == "black"){
    fill(0,0,125);
    ellipse(x,y, 30,20);
    fill(255,0,0);
    text(whattwo[i].num, x, y, 70,80);
  }
  y = y + 30;
}
}
nic(whatone,x1);
if(whattwo){
  ena(whattwo,x2);
}
}
