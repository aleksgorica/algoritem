/* Naloge:
  1. Design: - povečaj fižole, - dodaj fižolom sliko, spremeni barve - color adobe
  2. Funkcionalnost: Če fižoli zapolnejo stran pojdi v nov stolpec, logiraj rezultate,
  */
let box1 = [];
let box2 = [];
let box01 = [];
let box02 = [];
let polje = [
  [],
  []
];
const rx = 50;
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

let generacija = 0;
let ctx;

//***************************************************************
function preload() {
  redbean = loadImage("redbean.png");
  greenbean = loadImage("greenbean.png");
}

function setup() {
  div = select("#can");
  ctx = createCanvas(300, 300);
  ctx.parent(div);
  w = div.width;


  $("#potrdi").click(function() {
    potrditev();
    resizeCanvas(w, rx * celota.vnosParov * 5 / 6);

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
  ctx.background(33, 45, 56);
  display(box01, box02, 20, width - 20);
  display(polje[0], polje[1], width / 3, width / 3 * 2);
  //console.log(polje[0][3].x + " " + polje[0][3].y + "\n" + polje[0][3].newx + " "
  //+ polje[0][3].newy + "\n" + polje[0][3].vector + "\n" + polje[0][3].newvector + "\n" +  polje[0][3].movevector +"\n Številka" +polje[0][3].num);

}

function windowResized() {
  div = select("#can");
  w = div.width;
  resizeCanvas(w - 0.03 * windowWidth, 10000);
}

//**********************************************************
function Fizol(color, num) {
  this.color = color;
  this.num = num;
  this.x = 200;
  this.y = 5;
  this.newx;
  this.newy;
  this.movex;
  this.movey;
  this.update = function() {
    this.movex = (this.newx - this.x) / 10;
    this.movey = (this.newy - this.y) / 10;
    this.x += this.movex;
    this.y += this.movey;
  }


}

function start() {
  box1 = [];
  let wh = round(Number(celota.vnosBelih) * 2 * 0.01 * Number(celota.vnosParov));
  let bl = round(Number(celota.vnosČrnih) * 2 * 0.01 * Number(celota.vnosParov));
  for (let i = 0; i < wh; i++) {
    let f = new Fizol("white", i);
    box1.push(f);
  }
  box2 = [];
  for (let i = 0; i < bl; i++) {
    let b = new Fizol("black", i + Number(wh));
    box2.push(b);
  }
}

function razvrsti() {
  let box01a = [];
  let box02a = [];
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
<<<<<<< HEAD
  box01.forEach(function(current) {});
  box02.forEach(function(currentb) {});
=======

>>>>>>> 98ba10809bd91dab84c6e67dcca1c5fd6dca16ea
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
  box01.forEach(function(cur) {});
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
  vrniSteviloKombinacij();

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
}

function display(whatone, whattwo, x1, x2) {

  let ry = rx / 3 * 2;

  function nic(whatone, x1) {
    let x = x1
    let y = 5;
    for (let i = 0; i < whatone.length; i++) {
      whatone[i].newx = x;
      whatone[i].newy = y;
      whatone[i].update();
      if (whatone[i].color == "white") {
        fill(255);
        image(redbean, whatone[i].x, whatone[i].y, rx, ry);
        fill(255, 0, 0);
        text(whatone[i].num, whatone[i].x, whatone[i].y, 70, 80);
      }
      if (whatone[i].color == "black") {
        fill(0, 0, 125);
        image(greenbean, whatone[i].x, whatone[i].y, rx, ry);
        fill(255, 0, 0);
        text(whatone[i].num, whatone[i].x, whatone[i].y, 70, 80);
      }
      stroke(255);

      line(0, y, width, y);
      y = y + rx / 2 * 1.5;
      if (y > height) { // Če nočeš da gre v novo vrsto zbriši ta if blok
        x = x + rx;
        y = 5;
      }
    }

  }

  function ena(whattwo, x2) {
    let x = x2;
    let y = 5;
    for (let i = 0; i < whattwo.length; i++) {
      whattwo[i].newx = x;
      whattwo[i].newy = y;
      whattwo[i].update();
      if (whattwo[i].color == "white") {
        fill(255);
        image(redbean, whattwo[i].x - rx, whattwo[i].y, rx, ry);
        fill(255, 0, 0);
        text(whattwo[i].num, whattwo[i].x, whattwo[i].y, 70, 80);
      }
      if (whattwo[i].color == "black") {
        fill(0, 0, 125);
        image(greenbean, whattwo[i].x - rx, whattwo[i].y, rx, ry);
        fill(255, 0, 0);
        text(whattwo[i].num, whattwo[i].x, whattwo[i].y, 70, 80);
      }
      y = y + rx / 2 * 1.5;
      if (y > height) { // Če nočeš da gre v novo vrsto zbriši ta if blok
        x = x - rx;
        y = 5;
      }

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

  return skupniRezultati;
}

function potrditev() {
  let temcelota = showRatio();
  console.log(temcelota);
  celota.vnosBelih = temcelota.value0;
  celota.vnosČrnih = temcelota.value1;
  celota.vnosParov = temcelota.vnosParov;
  start();
  box01 = []; //Resetiramo, tako da odstranimo vse array-je
  box02 = [];
  box01a = [];
  [
    [],
    []
  ];
  box02a = [];
  polje = [
    [],
    []
  ];
  logiraj();
}

function logiraj() {
  $(".spodnji").html(`<span>Število rdečih:</span> ${round(2*(celota.vnosParov/100 * celota.vnosBelih))}
 <br>
  <span>Število zelenih:</span> ${round(2*(celota.vnosParov/100 * celota.vnosČrnih))}
  <br>
  <span>Matematična verjetnost - RDEČ RDEČ: ${(celota.vnosBelih*celota.vnosBelih*celota.vnosParov/10000)}</span>
  <br>
  <span>Matematična verjetnost - RDEČ ZELEN: ${(celota.vnosBelih*celota.vnosČrnih*2*celota.vnosParov/10000)} </span>
  <br>
  <span>Matematična verjetnost - ZELEN ZELEN: ${(celota.vnosČrnih*celota.vnosČrnih*celota.vnosParov/10000)  }</span>
  <br>
  <span>Število vseh fižolov: ${celota.vnosParov*2}</span>
  <br>
  <span>p = ${celota.vnosBelih/100}; q = ${celota.vnosČrnih/100}</span>
  <br>


  `);
}

function vrniSteviloKombinacij() {
  let rdrd = 0;
  let rdzl = 0;
  let zlzl = 0;
  for (let i = 0; i < polje[0].length; i++) {
    console.log(polje[0][i].color == polje[1][i].color && polje[0].color == "black");
    if (polje[0][i].color == polje[1][i].color && polje[0][i].color == "white") {
      rdrd += 1;

    } else if (polje[0][i].color == polje[1][i].color && polje[0][i].color == "black") {
      zlzl += 1;
    } else {
      rdzl += 1;
    }

  }
  $(".spodnji").append(`<span>Realno RDEČ RDEČ ${rdrd}</span><br/>
    <span>Realno RDEČ ZELEN ${rdzl}</span><br/>
    <span>Realno ZELEN ZELEN ${zlzl}</span><br/>`);

}
