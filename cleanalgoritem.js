
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
  meshBox01: [],
  meshBox2: [],
  meshBox02: [],
  meshPolje1: [],
  meshPolje2: []
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
  logiraj()
};
// document.getElementById('polpol').onclick = function() {
//   start()
// };
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
document.getElementById('ratio').onchange = function() {
  showRatio();
}




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
    this.movex = (this.newx - this.x) / 20; //izračunaj premik v x
    this.movey = (this.newy - this.y) / 20; //izračunaj premik v y
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

  //Ponovi vse za meshBoxe

  let meshBox01a = []; //ustvari lokalno spremenljivko, ki pomaga
  let meshBox02a = [];

  boxes.meshBox01 = boxes.meshBox1.filter(function(value, index, ar) {
    return (index % 2 == 0);
  });
  boxes.meshBox02 = boxes.meshBox1.filter(function(value, index, ar) {
    return ((index + 1) % 2 == 0);
  });

  meshBox01a = boxes.meshBox2.filter(function(value, index, ar) {
    return ((index + 1) % 2 == 0);
  });

  meshBox02a = boxes.meshBox2.filter(function(value, index, ar) {
    return (index % 2 == 0);
  });

  boxes.meshBox01 = boxes.meshBox01.concat(meshBox01a);
  boxes.meshBox02 = boxes.meshBox02.concat(meshBox02a);

  boxes.meshBox1.splice(0, boxes.meshBox1.length); //if(box2.length%2 != 0){
  boxes.meshBox2 = [];
  // boxes.meshbox2.splice(0, boxes.meshBox2.length);
}

function mix() { //random premešaj
  function shuffleArray(array1, array2) { //
    for (let i = array1.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array1[i], array1[j]] = [array1[j], array1[i]];
      [array2[i], array2[j]] = [array2[j], array2[i]];
    }
  }

  shuffleArray(boxes.box01, boxes.meshBox01);
  shuffleArray(boxes.box02, boxes.meshBox02);
}

function onfield() { //premakne fižole na polje
  boxes.polje[0] = boxes.box01;
  boxes.polje[1] = boxes.box02;
  boxes.meshPolje1 = boxes.meshBox01;
  boxes.meshPolje2 = boxes.meshBox02;
  boxes.box01 = [];
  boxes.box02 = [];
  boxes.meshBox01 = [];
  boxes.meshBox02 = [];
}

function razporedi() { //razvrsti fižole po barvah
  let poljef = [ //nov array pomaga razvrstiti po barvah, kasneje ga združimo
    [],
    []
  ];
  let meshPoljef = [
    [],
    []
  ];
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == boxes.polje[1][index].color && cur.color == "white") {
      poljef[0].push(boxes.polje[0][index]);
      poljef[1].push(boxes.polje[1][index]);
      meshPoljef[0].push(boxes.meshPolje1[index]);
      meshPoljef[1].push(boxes.meshPolje2[index]);
    }
  });
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color == boxes.polje[1][index].color && cur.color == "black") {
      poljef[0].push(boxes.polje[0][index]);
      poljef[1].push(boxes.polje[1][index]);
      meshPoljef[0].push(boxes.meshPolje1[index]);
      meshPoljef[1].push(boxes.meshPolje2[index]);
    }
  });
  boxes.polje[0].forEach(function(cur, index, arr) {
    if (arr[index].color != boxes.polje[1][index].color) {
      poljef[0].push(boxes.polje[0][index]);
      poljef[1].push(boxes.polje[1][index]);
      meshPoljef[0].push(boxes.meshPolje1[index]);
      meshPoljef[1].push(boxes.meshPolje2[index]);
    }
  });


  boxes.polje = poljef;
  boxes.meshPolje1 = meshPoljef[0];
  boxes.meshPolje2 = meshPoljef[1];
  console.log(boxes);
  vrniSteviloKombinacij();
}

function tobox() { //spravi nazaj v škatle
  for (let i = 0; i < boxes.polje[0].length; i++) {
    boxes.box01.push(boxes.polje[0][2 * i], boxes.polje[1][2 * i]);
    boxes.box02.push(boxes.polje[0][2 * i + 1], boxes.polje[1][2 * i + 1]);
    boxes.meshBox01.push(boxes.meshPolje1[2 * i], boxes.meshPolje2[2 * i]);
    boxes.meshBox02.push(boxes.meshPolje1[2 * i + 1], boxes.meshPolje2[2 * i + 1]);
  }

  boxes.box01 = boxes.box01.filter(function(e) {
    return e;
  });
  boxes.box02 = boxes.box02.filter(function(e) {
    return e;
  });
  boxes.meshBox01 = boxes.meshBox01.filter(function(e) {
    return e;
  });
  boxes.meshBox02 = boxes.meshBox02.filter(function(e) {
    return e;
  });

  if (boxes.polje[0].length % 2 != 0) {
    boxes.box01.pop();
    boxes.box01.pop();
    boxes.meshBox01.pop();
    boxes.meshBox01.pop();
    boxes.box01.push(boxes.polje[0][boxes.polje[0].length - 1]);
    boxes.box02.push(boxes.polje[1][boxes.polje[0].length - 1]);
    boxes.meshBox01.push(boxes.meshPolje1[boxes.meshPolje1.length - 1]);
    boxes.meshBox02.push(boxes.meshPolje2[boxes.meshPolje1.length - 1]);
  }


  boxes.polje[0] = [];
  boxes.polje[1] = [];
  boxes.meshPolje1 = [];
  boxes.meshPolje2 = [];
}



//funkcija prikaže vse na canvasu
//whatone = prvi array, whattwo = drugi array
//x1 = nova x pozicija; x2 = nova x pozicija za drugi array


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

function vrniSteviloKombinacij() {
  let rdrd = 0;
  let rdzl = 0;
  let zlzl = 0;
  for (let i = 0; i < boxes.polje[0].length; i++) {
    if (boxes.polje[0][i].color == boxes.polje[1][i].color && boxes.polje[0][i].color == "white") {
      rdrd += 1;

    } else if (boxes.polje[0][i].color == boxes.polje[1][i].color && boxes.polje[0][i].color == "black") {
      zlzl += 1;
    } else {
      rdzl += 1;
    }

  }
  document.getElementById("tabela").innerHTML += `
  <td>${rdrd}</td>
  <td>${rdzl}</td>
  <td>${zlzl}</td>`;

}

function logiraj() {
  document.getElementById("logger").innerHTML = `<span>Število rdečih:</span> ${Math.round(2*(kolicina.vnosParov/100 * kolicina.vnosBelih))}
 <br>
  <span>Število zelenih:</span> ${Math.round(2*(kolicina.vnosParov/100 * kolicina.vnosČrnih))}
  <br>
  <span>Matematična verjetnost - RDEČ RDEČ: ${(kolicina.vnosBelih*kolicina.vnosBelih*kolicina.vnosParov/10000)}</span>
  <br>
  <span>Matematična verjetnost - RDEČ ZELEN: ${(kolicina.vnosBelih*kolicina.vnosČrnih*2*kolicina.vnosParov/10000)} </span>
  <br>
  <span>Matematična verjetnost - ZELEN ZELEN: ${(kolicina.vnosČrnih*kolicina.vnosČrnih*kolicina.vnosParov/10000)  }</span>
  <br>
  <span>Število vseh fižolov: ${kolicina.vnosParov*2}</span>
  <br>
  <span>p = ${kolicina.vnosBelih/100}; q = ${kolicina.vnosČrnih/100}</span>
  <br>
     <table style="width:100%" id="tabela">
  <tr>
    <th>RDEČ RDEČ</th>
    <th>RDEČ ZELEN
    <th>ZELEN ZELENS</th>
  </tr>

</table> 
  `;
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
  boxes.meshBox01 = []; //Resetiramo, tako da odstranimo vse array-je
  boxes.meshBox02 = [];
  boxes.meshPolje1 = [];
  boxes.meshPolje2 = [];
}
let controls;

function init() {

  camera = new THREE.PerspectiveCamera(70, 0.66 * window.innerWidth / window.innerHeight, 0.01, 100);
  camera.position.z = 5;

  scene = new THREE.Scene();
  controls = new THREE.OrbitControls(camera);

  var light1 = new THREE.PointLight(0xFFFF00);
  var light2 = new THREE.PointLight(0xFFFF00);
  light1.position.set(10, 0, 25);
  scene.add(light1);
  light2.position.set(-10, 0, -25);
  scene.add(light2);
  geometry = new THREE.SphereBufferGeometry(0.2, 32, 32);
  geometry.applyMatrix(new THREE.Matrix4().makeScale(1.0, 1.2, 2));
  const redmaterial = new THREE.MeshNormalMaterial({
    color: 0x135fd8
  });
  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth * 0.66, window.innerHeight);
    camera.aspect = window.innerWidth * 0.66, window.innerHeight;
    camera.updateProjectionMatrix();
  });
  const greenmaterial = new THREE.MeshLambertMaterial({
    color: 0xfd59d7
  });

  const xgreen = -0.5;
  const xred = 0.5;
  const ypremik = -0.2;
  let ygreen = 0;
  let yred = 0;
  for (let i = 0; i < boxes.box1.length; i++) {
    const mesh = new THREE.Mesh(geometry, greenmaterial);
    boxes.meshBox1.push(mesh);
    scene.add(mesh);
    mesh.position.set(xgreen, ygreen, 0);
    ygreen += ypremik;
  }
  for (let i = 0; i < boxes.box2.length; i++) {
    const mesh = new THREE.Mesh(geometry, redmaterial);
    boxes.meshBox2.push(mesh);
    scene.add(mesh);
    mesh.position.set(xred, yred, 0);
    yred += ypremik;
  }

  controls.update();


  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth * 0.66, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  display(boxes.box1, boxes.box2, boxes.meshBox1, boxes.meshBox2, -1, 1);
}

function display(whatone, whattwo, whatMeshOne, whatMeshTwo, x1, x2) {
  const ry = 0.5;

  function nic(whatone, whatMeshOne, x1) {
    let x = x1
    let y = -3;
    for (let i = 0; i < whatone.length; i++) {
      whatone[i].newx = x;
      whatone[i].newy = y;
      whatMeshOne[i].position.x = whatone[i].x;
      whatMeshOne[i].position.y = whatone[i].y;
      if (whatMeshOne[i * 2 + 1]) {
        whatMeshOne[i * 2].rotation.y += 0.01;
        whatMeshOne[i * 2 + 1].rotation.y -= 0.01;
      }

      whatone[i].update();
      y += ry;
    }
  }

  function ena(whattwo, whatMeshTwo, x2) {
    let x = x2;
    let y = -3;
    for (let i = 0; i < whattwo.length; i++) {
      whattwo[i].newx = x;
      whattwo[i].newy = y;
      whattwo[i].update();
      whatMeshTwo[i].position.x = whattwo[i].x;
      whatMeshTwo[i].position.y = whattwo[i].y;
      if (whatMeshTwo[i * 2 + 1]) {
        whatMeshTwo[i * 2].rotation.y += 0.01;
        whatMeshTwo[i * 2 + 1].rotation.y -= 0.01;
      }
      y = y + ry
    }
  }
  nic(whatone, whatMeshOne, x1);
  if (whattwo) {
    ena(whattwo, whatMeshTwo, x2);
  }
}

function animate() {
  display(boxes.box01, boxes.box02, boxes.meshBox01, boxes.meshBox02, -1.2, 1.2);
  display(boxes.polje[0], boxes.polje[1], boxes.meshPolje1, boxes.meshPolje2, -0.5, 0.5);
  requestAnimationFrame(animate);

  controls.update();


  renderer.render(scene, camera);

}
