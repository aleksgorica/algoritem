/* Naloge:
  1. Design: - povečaj fižole, - dodaj fižolom sliko, spremeni barve - color adobe
  2. Funkcionalnost: Če fižoli zapolnejo stran pojdi v nov stolpec, logiraj rezultate,
  */
let box1 = [];
let box2 = [];
let box01 = [];
let box01a = [];
let box02 = [];
let box02a = [];
let polje = [
  [],
  []
];
let a = false;
let w;
let h;
let div;
let celota = {
  vnosBelih: undefined,
  vnosČrnih: undefined,
  vnosParov: undefined
}
let redbean;
let greenbean;


let ctx;

//***************************************************************
function preload(){
  redbean = loadImage("redbean.png");
  greenbean = loadImage("greenbean.png");
}

function setup() {
  div = select("#can");
  ctx = createCanvas(300, 300);
  ctx.parent(div);
  w = div.width;
  h = div.height;
  console.log(ctx);
  resizeCanvas(w, windowHeight);


  $("#potrdi").click(function() {
    potrditev();
  });
  $("#gumb").click(function() {
    razvrsti()
  });
  $("#razvrsti").click(function() {
    mix();
  });
  $("#onfield").click(function() {
    onfield();
    a = true;
    $(this).attr('disabled', 'disabled');
  });
  $("#razporedi").click(function() {
    razporedi();
  });
  $("#tobox").click(function() {
    tobox();
    $("#onfield").removeAttr("disabled");
  });

  let rat = select("#ratio");
  rat.input(showRatio);
}
//**********************************************************************
function draw() {
  ctx.background(0);
  display(box01, box02, 20, width - 20);
  display(polje[0], polje[1], width / 3, width / 3 * 2);
}

function windowResized() {
  div = select("#can");
  w = div.width;
  h = div.height;
  resizeCanvas(w - 0.03 * windowWidth, windowHeight);
}

//**********************************************************
function Fizol(color, num) {
  this.color = color;
  this.num = num;
}

function start() {
  box1 = [];
  let wh = round(Number(celota.vnosBelih) * 2 * 0.01 * Number(celota.vnosParov));
  let bl = round(Number(celota.vnosČrnih) * 2 * 0.01 * Number(celota.vnosParov));
  console.log(celota.vnosBelih + "  " + celota.vnosČrnih + "  " + celota.vnosParov);
  console.log(wh + " " + bl);
  for (let i = 0; i < wh; i++) {
    let f = new Fizol("white", i);
    box1.push(f);
    console.log(box1[i].color);
  }
  box2 = [];
  for (let i = 0; i < bl; i++) {
    let b = new Fizol("black", i + Number(wh));
    box2.push(b);
    console.log(box2[i].color);
  }
}

function razvrsti() {
  if ((box1.length + box2.length) % 2 != 0) {
    start();
  }
  box01 = box1.filter(function(value, index, ar) {
    return (index % 2 == 0);
  });
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
  box1.splice(0, box1.length); //if(box2.length%2 != 0){
  //  box02.push(box2[length]);
  //}
  box2.splice(0, box2.length);
  console.log("box01");
  box01.forEach(function(current) {
    console.log(current.color);
  });
  console.log("box02");
  box02.forEach(function(currentb) {
    console.log(currentb.color);
  });
}

function mix() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(box01);
  shuffleArray(box02);
  console.log("zacetek");
  box01.forEach(function(cur) {
    console.log(cur.color);
  });
}

function onfield() {
  polje[0] = box01;
  polje[1] = box02;
  box01 = [];
  box02 = [];
}

function razporedi() {
  let poljef = [
    [],
    []
  ];
  polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == polje[1][index].color && cur.color == "white") {
      poljef[0].push(cur);
      poljef[1].push(polje[1][index]);
    }
  });
  polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == polje[1][index].color && cur.color == "black") {
      poljef[0].push(cur);
      poljef[1].push(polje[1][index]);
    }
  });
  polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color != polje[1][index].color) {
      poljef[0].push(cur);
      poljef[1].push(polje[1][index]);
    }
  });
  polje = poljef;
}

function tobox() {
  for (let i = 0; i < polje[0].length; i++) {
    box01.push(polje[0][2 * i], polje[1][2 * i]);
    box02.push(polje[0][2 * i + 1], polje[1][2 * i + 1]);
  }
  box01 = box01.filter(function(e) {
    return e;
  });
  box02 = box02.filter(function(e) {
    return e;
  });
  if (polje[0].length % 2 != 0) {
    box01.pop();
    box01.pop();
    box01.push(polje[0][polje[0].length - 1]);
    box02.push(polje[1][polje[0].length - 1]);
  }

  polje[0] = [];
  polje[1] = [];
  console.log("tobox deluje");
}

function display(whatone, whattwo, x1, x2) {
  let rx = 50;
  let ry = rx / 3 * 2;
  function nic(whatone, x1) {
    let x = x1
    let y = 5;
    for (let i = 0; i < whatone.length; i++) {
      if (whatone[i].color == "white") {
        fill(255);
        image(redbean, x, y, rx, ry);
        fill(255, 0, 0);
        text(whatone[i].num, x, y, 70, 80);
      }
      if (whatone[i].color == "black") {
        fill(0, 0, 125);
        image(greenbean, x, y,rx,ry);
        fill(255, 0, 0);
        text(whatone[i].num, x, y, 70, 80);
      }
      y = y + rx / 2 * 1.5;
    }
  }

  function ena(whattwo, x2) {
    let x = x2;
    let y = 5;
    for (let i = 0; i < whattwo.length; i++) {

      if (whattwo[i].color == "white") {
        fill(255);
        image(redbean,x,y,rx,ry);
        fill(255, 0, 0);
        text(whattwo[i].num, x, y, 70, 80);
      }
      if (whattwo[i].color == "black") {
        fill(0, 0, 125);
        image(greenbean,x,y,rx,ry);
        fill(255, 0, 0);
        text(whattwo[i].num, x, y, 70, 80);
      }
      y = y + rx/2 * 1.5;
    }
  }
  nic(whatone, x1);
  if (whattwo) {
    ena(whattwo, x2);
  }
}

function showRatio() {
  let skupniRezultati = {
    value0: $("#ratio").val(),
    vnosParov: $("#numpar").val(),
    get value1() {
      return 100 - this.value0;
    }
  }
  $("#shratio").html("belih: " + skupniRezultati.value0 + "<br> črnih: " + skupniRezultati.value1);
  console.log(skupniRezultati.value0);
  console.log(celota.vnosČrnih);
  return skupniRezultati;
}

function potrditev() {
  let temcelota = showRatio();
  console.log(temcelota);
  celota.vnosBelih = temcelota.value0;
  celota.vnosČrnih = temcelota.value1;
  celota.vnosParov = temcelota.vnosParov;
  console.log(celota + "To je celota");
  console.log(celota.vnosBelih);
  console.log(celota.vnosČrnih + "to je vnos črnih");
  start();
  box01 = []; //Resetiramo, tako da odstranimo vse array-je
  box02 = [];
  box01a = [];
  box02a = [];

}
