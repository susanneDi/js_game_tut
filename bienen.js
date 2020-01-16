//Vorarbeit für Spiel- und Zielfelderstellung
var x = 0;
var y = 0;
// *28 = 28 verschiedenen Positionen * 20 da feld 600 pixel
// und 20 * 28 560 ist und + 20 damit weder position ganz rechts
// noch ganz links verwendet wird
var zielx = Math.floor(Math.random()*28)*20+20;
var ziely = 460;
//Für's Punktekonto
var siegpunkte = 0;
//Für's Zeitlimit
var spielzeit = 30;
var restzeit = 0;
var startzeit = new Date();
//für die "Gegner"
var gegnerpositionen = [1, 10, 60, 100, 150, 296];
var gegnerbewegung = [2, 3, -2, 4, 5, -3];

$(document).ready(function() {
  //Arrays in console ausgeben
  console.log('c ' + gegnerpositionen);
  console.log(gegnerbewegung);
  //nach 300 millisekunden wird eine Taktung für eine fct mit
  //dem Namen taktung gesetzt
  takt = window.setInterval(taktung, 300);
  var spielbrett = document.getElementById('leinwand');
  spielfeld = spielbrett.getContext('2d');
  var spielfigur = new Image();
  spielfigur.src='bilder/spielfigur.png';
  //Wenn die spielfigur geladen ist, wird die folgende fct gestartet
  spielfigur.onload=function() {
    //mit der canvas methode drawImage ein Bild auf das canvas
    // Element zeichnen
    spielfeld.drawImage(spielfigur,x,y);
  }
//Zielfeld erstellen
  function zeichneZielfeld() {
    var zielfeld = new Image();
    zielfeld.src = 'bilder/zielbereich.png';
    zielfeld.onload = function() {
      spielfeld.drawImage(zielfeld, zielx, ziely);
    }
  }
  //fct gleich aufrufen, damit das auch passiert u unten bei
  //Taktung, damit das auch immer wieder passiert
  zeichneZielfeld();

  function zielfelderreicht() {
    console.log("x: "+ x + "|Ziel x:" + zielx);
    console.log("y: "+ y + "|Ziel y:" + ziely);

    if(x==zielx && y==ziely) {
      //Ziel zielfelderreicht
      console.log("Ziel erreicht!");
      // neues Ziel erzeugen
      if (ziely == 460) {
        ziely = 0;
      }
      else {
        ziely = 460;
    }
    zielx = Math.floor(Math.random()*28)*20+20;
    siegpunkte++;
    $('#punktestand').html('Siegpunkte: ' + siegpunkte);
  }
}

//Testbereich um zu sehen was aus Taktung raus kann
//fct um Timer zu stoppen und Anzeige aufpoppen zu lassen
function spielende() {
  clearInterval(takt);
  $('#spielendeanzeige').show();
}

function setzeGegner() {
  console.log('Länge gegpos: ' + gegnerpositionen.length);
  for (nr = 0; nr < gegnerpositionen.length; nr++) {
    gegnerpositionen[nr] += gegnerbewegung[nr] *5;
    if (gegnerpositionen[nr] > 580 || gegnerpositionen[nr] < 0) {
      gegnerbewegung[nr] *= -1;
    }
    erzeugeGegner(gegnerpositionen[nr], 360-(nr*40));
  }
}

function erzeugeGegner(gx, gy) {
  var img = new Image();
  img.src = 'bilder/gegnerfigur.png';
  img.onload = function() {
    spielfeld.drawImage(img, gx, gy);
  }
}

  //fct für Taktung
  function taktung() {
    //löscht Inhalt des kompletten Spielfelds
    //Sonst bleibt die alte Figur stehen
    spielfeld.clearRect(0, 0, 600,480);
    // damit das Zielfeld auch bei jeder Taktung erhalten bleibt
    zeichneZielfeld()
    //mit jedem Aufrug der Fkt taktung also alle 300 millisekunden
    //wird die spielfigur neu gezeichnet
    spielfeld.drawImage(spielfigur,x,y);
    //und das selbe mit zielfelderreicht
    zielfelderreicht();
    setzeGegner();

    var aktuellezeit = new Date();
    restzeit = spielzeit - Math.floor((aktuellezeit.getTime()-startzeit.getTime()) / 1000);
    console.log(restzeit)
    $('#spielzeit').html('Spielzeit: ' + restzeit);
    if (restzeit <= 0) {
      spielende();
    }
  //hier fct spielende wieder rein

  //und zwar genau unter dem u von und fct setzeGegner


    }

  //gebundene Funktion ruft irgendwie Objekt auf, durch this Wert, der
  //an bind als Arg übergeben wurde
  $(document).bind('keydown', function (evt) {
    console.log(evt.keyCode);
    switch (evt.keyCode) {
      //Pfeiltaste nach unten
      case 40:
        console.log("Pfeiltaste nach unten");
        y += 20;
        if (y >= 480) {
            y = 460;
        }
        console.log("Wert y: "+y);
//???Warum hier false
        return false;
        break;
      //Pfeiltaste nach oben
      case 38:
        console.log("Pfeiltaste nach oben");
        y -= 20;
        if (y <= 0) {
            y = 0;
          }
        console.log("Wert -y: "+y);
        return false;
        break;
      //Pfeiltaste nach rechts
      case 39:
        console.log("Pfeiltaste nach rechts");
        x += 20;
        if (x >= 600) {
            x = 580;
        }
        console.log("Wert x: "+x);
        return false;
        break;
        //Pfeiltaste nach links
        case 37:
          console.log("Pfeiltaste nach links");
          x -= 20;
          if (x <= 0) {
              x = 0;
          }
          console.log("Wert x: "+x);
          return false;
          break;
    }
  });

});
