let boxes = {
  box1: [], //opisuje koliko je belih na začetku v škatli1
  box2: [], //opisuje koliko je črnih na začetku v škatli2
  box01: [], //v drugem koraku, prvi kozarec, v katerega damo pol belih, pol črnih
  box02: [], //v drugem koraku, drugi kozarec, v katerega damo pol belih pol črnih
  polje: [
    [],
    []
  ], //fižoli ko so na polju
  meshBox1: [],
  meshBox2: []
};

let kolicina = { //tej spremenjlivki določi vrednost z inputi
  vnosBelih: undefined, //pove nam kolikšno bo razmerje in število parov
  vnosCrnih: undefined,
  vnosParov: undefined
};
var camera, scene, renderer;
var geometry, material;

document.getElementById('potrdi').onclick = function() {
  potrditev()
};
document.getElementById('polpol').onclick = function() {
  start()
};
document.getElementById('razvrsti').onclick = function() {
  razvrsti()
};
document.getElementById('premešaj').onclick = function() {
  mix()
};
document.getElementById('onfield').onclick = function() {
  onfield()
};
document.getElementById('razporedi').onclick = function() {
  razporedi()
};
document.getElementById('tobox').onclick = function() {
  tobox()
};




class Fizol { //objekt fižola
  constructor(color, num) { //color je barva fižola, num je index
    this.color = color;
    this.num = num;
    this.x = 2; //trenutna x pozicija
    this.y = 5; //trenutna y pozicija
    this.newx; //nova x pozicija
    this.newy; //nova y pozicija
    this.movex; //premik v x os
    this.movey; //premik v y os
  }

  update() { //metoda premikanja
    this.movex = (this.newx - this.x) / 10; //izračunaj premik v x
    this.movey = (this.newy - this.y) / 10; //izračunaj premik v y
    this.x += this.movex; //dodaj premikX k x
    this.y += this.movey; //dodaj premik Y k y
  }
}

function start() { //inicializacija
  boxes.box1 = []; //izprazni box1 in box2
  boxes.box2 = [];
  //število belih in črnih fižolov
  let numWhite = Math.round(Number(kolicina.vnosBelih) * 2 * 0.01 * Number(kolicina.vnosParov));
  let numBlack = Math.round(Number(kolicina.vnosČrnih) * 2 * 0.01 * Number(kolicina.vnosParov));
  for (let i = 0; i < numWhite; i++) {
    let belifizol = new Fizol("white", i);
    boxes.box1.push(belifizol);
  }
  for (let i = 0; i < numBlack; i++) {
    let crnifizol = new Fizol("black", i + Number(numWhite));
    boxes.box2.push(crnifizol);
  }
  console.log(boxes.box1);
  console.log(boxes.box2);
  init();
  animate();
}

function razvrsti() { //pol fižolov ene barve na eno stran, pol fižolov na drugo
  let box01a = []; //ustvari lokalno spremenljivko, ki pomaga
  let box02a = [];

  boxes.box01 = boxes.box1.filter(function(value, index, ar) {
    return (index % 2 == 0);
  });
  boxes.box02 = boxes.box1.filter(function(value, index, ar) {
    return ((index + 1) % 2 == 0);
  });

  box01a = boxes.box2.filter(function(value, index, ar) {
    return ((index + 1) % 2 == 0);
  });

  box02a = boxes.box2.filter(function(value, index, ar) {
    return (index % 2 == 0);
  });

  boxes.box01 = boxes.box01.concat(box01a);
  boxes.box02 = boxes.box02.concat(box02a);

  boxes.box1.splice(0, boxes.box1.length); //if(box2.length%2 != 0){
  boxes.box2.splice(0, boxes.box2.length);
  console.log("nekaj se je izvedlo");
  console.log(boxes.box01);
  console.log(boxes.box02)
}

function mix() { //random premešaj
  function shuffleArray(array) { //
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(boxes.box01);
  shuffleArray(boxes.box02);
}

function onfield() { //premakne fižole na polje
  boxes.polje[0] = boxes.box01;
  boxes.polje[1] = boxes.box02;
  boxes.box01 = [];
  boxes.box02 = [];
}

function razporedi() { //razvrsti fižole po barvah
  let poljef = [ //nov array pomaga razvrstiti po barvah, kasneje ga združimo
    [],
    []
  ];
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == boxes.polje[1][index].color && cur.color == "white") {
      poljef[0].push(cur);
      poljef[1].push(boxes.polje[1][index]);
    }
  });
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == boxes.polje[1][index].color && cur.color == "black") {
      poljef[0].push(cur);
      poljef[1].push(boxes.polje[1][index]);
    }
  });
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color != boxes.polje[1][index].color) {
      poljef[0].push(cur);
      poljef[1].push(boxes.polje[1][index]);
    }
  });
  boxes.polje = poljef;
  vrniSteviloKombinacij();
}

function tobox() { //spravi nazaj v škatle
  for (let i = 0; i < boxes.polje[0].length; i++) {
    boxes.box01.push(boxes.polje[0][2 * i], boxes.polje[1][2 * i]);
    boxes.box02.push(boxes.polje[0][2 * i + 1], boxes.polje[1][2 * i + 1]);
  }
  boxes.box01 = boxes.box01.filter(function(e) {
    return e;
  });
  boxes.box02 = boxes.box02.filter(function(e) {
    return e;
  });
  if (boxes.polje[0].length % 2 != 0) {
    boxes.box01.pop();
    boxes.box01.pop();
    boxes.box01.push(boxes.polje[0][boxes.polje[0].length - 1]);
    boxes.box02.push(boxes.polje[1][boxes.polje[0].length - 1]);
  }

  boxes.polje[0] = [];
  boxes.polje[1] = [];
}

//funkcija prikaže vse na canvasu
//whatone = prvi array, whattwo = drugi array
//x1 = nova x pozicija; x2 = nova x pozicija za drugi array
// function display(whatone, whattwo, x1, x2) {
//   function nic(whatone, x1) {
//     let x = x1;
//     let y = 0;
//     for (let i = 0; i < whatone.length; i++) {
//       whatone[i].newx = x;
//       whatone[i].newy = y;
//       whatone[i].update();
//       if (whatone[i].color == "white") {
//         const mesh = new THREE.Mesh(geometry, greenmaterial);
//         scene.add(mesh);
//         mesh.position.set(x, y, 0);
//       }
//       if (whatone[i].color == "black") {
//         const mesh = new THREE.Mesh(geometry, redmaterial);
//         scene.add(mesh);
//         mesh.position.set(x, y, 0);
//       }
//       y += 1;
//     }
//   }
//
//   function ena(whattwo, x2) {
//     let x = x2;
//     let y = 0;
//     for (let i = 0; i < whattwo.length; i++) {
//       whattwo[i].newx = x;
//       whattwo[i].newy = y;
//       whattwo[i].update();
//       if (whattwo.color == "white") {
//         const mesh = new THREE.Mesh(geometry, greenmaterial);
//         scene.add(mesh);
//         mesh.position.set(x, y, 0);
//       }
//       if (whattwo[i].color == "black") {
//         const mesh = new THREE.Mesh(geometry, redmaterial);
//         scene.add(mesh);
//         mesh.position.set(x, y, 0);
//       }
//       y = y + 1;
//     }
//   }
//   nic(whatone, x1);
//   if (whattwo) {
//     ena(whattwo, x2);
//   }
// }

function showRatio() {
  let skupniRezultati = {
    value0: document.getElementById("ratio").value,
    vnosParov: document.getElementById("numpar").value,
    get value1() {
      return 100 - this.value0;
    }
  }
  document.getElementById("shratio").innerHTML = "belih: " + skupniRezultati.value0 + "<br> črnih: " + skupniRezultati.value1;
  return skupniRezultati;
}

function potrditev() {
  let temkolicina = showRatio();
  kolicina.vnosBelih = temkolicina.value0;
  kolicina.vnosČrnih = temkolicina.value1;
  kolicina.vnosParov = temkolicina.vnosParov;
  start();
  boxes.box01 = []; //Resetiramo, tako da odstranimo vse array-je
  boxes.box02 = [];
  boxes.polje = [
    [],
    []
  ];
}
let controls;

function init() {

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.z = 5;

  scene = new THREE.Scene();
  controls = new THREE.OrbitControls(camera);

  var light = new THREE.PointLight(0xFFFF00);
  light.position.set(10, 0, 25);
  scene.add(light);
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const redmaterial = new THREE.MeshNormalMaterial({
    color: 0x135fd8
  });

  const greenmaterial = new THREE.MeshLambertMaterial({
    color: 0xfd59d7
  });

  const xgreen = -1;
  const xred = 1;
  let ygreen = 0;
  let yred = 0;
  for (let i = 0; i < boxes.box1.length; i++) {
    const mesh = new THREE.Mesh(geometry, greenmaterial);
    boxes.meshBox1.push(mesh);
    scene.add(mesh);
    mesh.position.set(xgreen, ygreen, 0);
    ygreen += 0.3;
  }
  for (let i = 0; i < boxes.box2.length; i++) {
    const mesh = new THREE.Mesh(geometry, redmaterial);
    boxes.meshBox2.push(mesh);
    scene.add(mesh);
    mesh.position.set(xred, yred, 0);
    yred += 0.3;
  }

  controls.update();


  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);

  // for (let i = 0; i < boxes.box1.length; i++) {
  //   boxes.box1[i].rotation.x += 0.01;
  // }
  // for (let i = 0; i < boxes.box2.length; i++) {
  //   boxes.box2[i].rotation.x += 0.01;
  // }
  controls.update();


  renderer.render(scene, camera);

}
