# algoritem
Raziskovanje modela genov
Povzetek
Izdelal sem algoritem, ki simulira eksperiment izdelave modela genov ter v trenutku prikaže rezultate. Z enim klikom program opravi več težjih nalog ter nam posreduje informacije, za katere bi brez algoritma potrebovali minimalno 8 min. Algoritem je napisan v programskem jeziku JavaScript in je prosto dostopen na spletu, zato bo v pomoč tudi profesorjem, dijakom po svetu, saj omogoča vizualno predstavo eksperimenta.

Ključne besede: model genov, JavaScript, algoritem, eksperiment, biologija, programiranje, splet.
Vsebina
Kaj je model genov?
Kadar imamo v mislih vse gene, ki določajo neko lastnost v dani populaciji, govorimo o skladu genov. Polovica sklada genov je prisotna v vseh moških gametah, polovica pa v vseh ženskih gametah. Ti geni pridejo skupaj pri oploditvi. Tedaj nastanejo genski pari, ki določajo, kakšen bo osebek. Če določata to lastnost dva različna alela (npr. eden belo drugi rdečo barvo semen), so po oploditvi možne tri različne kombinacije genskih parov. Verjetnost neke kombinacije je v veliki meri odvisna od tega, v kolikšnem odstotku je zastopan en ali drugi alel v celotnem skladu genov.
Da bi lažje razumeli, kako delujejo zakoni verjetnosti v živi populaciji, si bomo pomagali z modelom. Gene bodo nadomeščala fižolova semena. Eno skupino alelov bodo predstavljala fižolova semena bele, drugo skupino pa fižolova semena rdeče barve. Iz teh semen bomo sestavljali različne kombinacije. Po dve in dve semeni bosta v našem modelu ponazarjali genski par za določeno lastnost.


Kaj se sprašujem?
Zanima me, ali se z več generacijami poskusa približujemo matematičnemu izračunu verjetnosti.

Kombinacije
Matematično pričakovano
Posamezni rezultati
Vsi rezultati v %
F1
F2
F3
BB










BR in RB










RR










Legenda:
BB - belo in belo
BR in RB - belo in rjavo ali rjavo in belo
RR - rjavo in rjavo
F - generacija

Za vsako generacijo, ki jo izmerimo, vpišemo število parov kot rezultat pod F (število generacije). Ko izmerimo več generacij, jim lahko izračunamo povprečje, ki ga zapišemo v zadnji stolpec.
Povprečje izračunamo po formuli:
Št. parov ene kombinacijeŠt. parov več kombinacij100 = % kombinacij
Zanima nas tudi, kolikšna je matematična verjetnost, da bi iz obeh čaš potegnili dve določeni barvi semena, kar izračunamo po formuli:
verjetnost BB = (delež belih)2; verjetnost RB in BR =2*( delež belih)(delež rjavih);
verjetnost RR = (delež rjavih)2
Formula nam tudi pove kolikšen delež določene kombinacije, bo na polju.
HIPOTEZA: Več generacij poskusa kot naredimo, bolj se približujemo matematičnemu izračunu.
PROBLEM: izvajanje poskusa je zamudno, saj potrebujemo veliko časa vsaj 8 min, da izvedemo eno generacijo, lahko se zmotimo, da zamešamo fižole, zaradi česar moramo ponoviti eksperiment.
REŠITEV: Da ne bi izvajal eksperimenta ročno, sem napisal program, ki je zmožen izvajati mnogo zaporednih simulacij poskusa v trenutku nezmotljivo, ter nam posreduje informacije o rezultatih. Omogočal bo tudi 3D vizualno predstavo.


O Programu
URL programa: https://aleksgorica.github.io/algoritem/cleanhtml
Koda programa:
Program je napisan v programskem jeziku za splet JavaScript. Program je javno dostopen kot spletna stran, zato imajo vsi dostop. Stran je sestavljena iz interaktivnega WebGL Canvasa, kjer se vizualno prikazuje eksperiment, loggerja, ki beleži rezultate ter nadzornih gumbov, s katerimi vodimo eksperiment.
Kaj je JavaScript?
JavaScript je objektni skriptni programski jezik, ki ga je razvil Netscape, da bi spletnim programerjem pomagal pri ustvarjanju interaktivnih spletnih strani.
Jezik je bil razvit neodvisno od Jave, vendar si z njo deli številne lastnosti in strukture. JavaScript lahko sodeluje s HTML-kodo in s tem poživi stran z dinamičnim izvajanjem. JavaScript podpirajo velika programska podjetja in kot odprt jezik ga lahko uporablja vsakdo, ne da bi pri tem potreboval licenco. Podpirajo ga vsi novejši spletni brskalnik. Zato sem ga izbral za projekt, saj vsi imamo brskalnik. Vpišemo le URL spletne strani, kjer se izvaja program in deluje.

Kaj je ThreeJS?
Da bi lahko prikazal program vizualno, je potrebno program izvesti na grafični kartici - GPU.  Tega s čistim JavaScript-om ne moremo izvesti, zato je potreben vmesnik. WebGL, je spletna različica znanega openGL, ki namesto da prevaja 3D-grafiko na namizju, jo prevaja v brskalniku, ki kasneje posreduje grafični kartici. Vendar je zelo zapleten za uporabo, saj je potrebno veliko “low-level” znanja prevajanja grafike. Zato je nastal ThreeJS, knjižnica za WebGL, ki olajša veliko dela. Namesto, da za prikaz ene 3D kocke, pišemo zapletene algoritme linearne algebre, uporabimo le nekaj vrstic kode.

Moj 3D prostor
Da lahko prikažemo 3D prostor moramo:
Vključiti ThreeJS knjižnico v HTML
Definirati kamero (prvi argument predstavlja kot, ki ga kamera zajame, drugi razmerje in višino, tretji najmanjša oddaljenost, četrti največja oddaljenost):
camera = new THREE.PerspectiveCamera(70, 0.66 * window.innerWidth / window.innerHeight, 0.01, 100)
Definirati sceno (brez argumentov)
 scene = new THREE.Scene();
Definirati kontrolerje (omogočajo spreminjanje pogled kamere, argument je objekt kamere)
Definirati moramo materijal, s katerimi obložimo geometrijo (imam tri materiale)
Definirati moramo geometrijo: ustvaril sem kroglo (sfero), ki sem jo razširil po y osi, da nastane elipsoid
Definirati moramo luči, ki osvetljujejo sceno, saj po defaultu je scena temna (prvi argument je barva luči predstavljena z heksadecimalno vrednostjo, drugi je razdalja do kje sveti luč)
Nato moramo nastaviti položaj luči v prostoru
light1 = new THREE.PointLight( 0xffffff, 1, 10000 );
light1.position.set(10, 0, 25 );=

Navodila za uporabo
V tekstovno okno vpišemo število parov
Nastavimo želeno razmerje med barvama
Kliknemo gumb "POTRDI" → scena na Canvasu se postavi ter izpiše:
Št. rdečih fižolov
Št. modrih fižolov
Št. vseh fižolov
Alel p - izraža rdečo lastnost
Alel q - izraža modro lastnost
Tabelo: prvi stolpec ponazarja kombinacijo Rdeč-Rdeč, drugi stolpec ponazarja kombinacijo Rdeč-Moder in Moder-Rdeč, tretji stolpec ponazarja kombinacijo Moder-Moder. V prvi vrstici tabele izvemo matematično pričakovan izid
Gumb "PREMEŠAJ" - fižoli v škatli se naključno premešajo
Gumb "NA POLJE" - fižoli iz škatle se premaknejo na polje --> nastanejo kombinacije
6. Gumb "RAZPOREDI" - razporedi kombinacije na polju, najnižje je kombinacija RR, nato sledi kombinacija MM, nazadnje pa kombinacija RM in MR. V tabeli izpiše dejansko število kombinacij RR, MM, MR ter izračuna njihovo skupno povprečje
7. Gumb "V ŠKATLO" - premakne prva dva fižola iz polja (prvega moškega in prvo žensko) v škatlo_1, druga dva v škatlo_2, nato tretja dva v škatlo_1, četrta dva v škatlo_2 in tako dalje

Izdelal: Aleks Stepančič, Mentor: Pavel Bone, Leto: 2018, Šola: Gimnazija Nova Gorica
