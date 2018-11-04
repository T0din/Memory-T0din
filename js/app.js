/*
j'arrive à générer depuis le tableau les div avec les class.
J'arrive à faire en sorte que les div soient clickables et deviennent visibles quand elles clickés.
Si 2 div on été clické, elles se retournent.
j'arrive à afficher des images avec la technique du sprite.
MAIS ce ne sont pas les bonnes (je n'ai pas 14 paires).
Les paires ne pas encore détectées et donc non retournées.
la 14eme paire trouvée n'est pas détectée pour afficher victoire.
Et je ne me suis pas penché ni sur le scoreboard ni sur la barre de temps ni sur les modes de difficulté.

17/10/18
J'ai intégré une partie de ce qui était en dehors de var app dedans.
J'ai mis en place un shuffle pour randomiser la génération de carte qui fonctionne.
En mettant i3 et i3+14 (avec app.iVR.length/2), j'arrive à générer des paires d'image. Mais pas aléatoires.
MAIS, les images sont générées APRES le shuffle. Il ne randomise donc que les numéros dans le tableau. Il faut donc que j'arrive à lier les images à ces numéros au lieu de les générer comme actuellement.

SPOILER : utiliser dataset pour reconnaître les paires.

18/10/18
J'ia commencé à essayer de gérer le problème des images.
Je parseInt le innerHTML de '.cards' pour récupérer le numéro de la carte (entre 0 et 13).
J'arrive bien à récupérer ce numéro dans index. Mais je n'arrive pas à poser les images dessus par paire correctement.
WIP

21/10/18
En utilisant dataset et de classes css (pour le moment ???), j'ai réussi à m'en sortir avec les images. Elles sont bien randomisées, avec un nuémro par paire et les images s'appliquent dessus.
Je me suis rendu compte que mon système de click actuel risque de poser problème par la suite mais je m'en occuperai le  moment venu.
Actuellement, le soucis, c'est de détecté les bonnes paires, de les laisser découvertes et de laisser le joueur continuer à jouer.
Une fois que j'aurai réussi à détecter parmi les 'cacheclicked', les paires qui matchent, ça devrait être assez facile de les laisser découverte, de bloquer le fait de pouvoir intéragir avec et de laisser le joueur continuer jusqu'à la victoire.
Mais je n'ai pas encore encore trouver le moyen de remonter depuis le ciblage de la class 'cacheclicked' vers son parent (carte) puis de comparer les dataset des cartes clickées pour voir si les numéros sont identiques. J'étais en train d'essayer parentNode.
Mais même une fois que j'aurai réussi à remonter vers le parent, il faudra encore trouver un moyen de comparer son numéro à tous les 'cacheclicked' découverts (qui ne devrait être qu'une seule carte si tout se passe bien).
*/
var iVLengthDifficulty = 28;
var iV = new Array(iVLengthDifficulty);

for (var i = 0, l = iVLengthDifficulty; i < l; i++) {
  iV[i] = Math.floor(i / 2);
};

var app = {
  // iVLengthDifficulty: 28,
  // iV: new Array(iVLengthDifficulty),
  $board: document.getElementById('board'),
  cards: [],
  element: {},
  iVR: {},
  numberCardAlreadyClicked: 0,
  image: document.querySelector('.image'),

  generatePaires: function(iV) {
    for (var i = 0, l = iVLengthDifficulty; i < l; i++) {
      iV[i] = Math.floor(i / 2);
    }
  },
  init: function() {
    app.generatePaires(iV);
    app.shuffle(iV);
    app.iVR = iV;
    app.generateCards(app.iVR);
  },
  shuffle: function(iV) {
    var j, x, i;
    for (i = iV.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = iV[i];
      iV[i] = iV[j];
      iV[j] = x;
    }
    return iV;
  },
  generateCards: function() {
    for (var i = 0, l = app.iVR.length; i < l; i++) {
      app.cards.push(app.createCard(app.iVR[i]));
      app.$board.appendChild(app.cards[i]);
    }
  },
  createCard: function(value) {
    var card = document.createElement('a');
    card.className = 'carte';
    card.style = 'position: relative';
    card.setAttribute('data-number', value);

    card.addEventListener('click', function(evt) {
      evt.stopPropagation();
      if (app.numberCardAlreadyClicked === 0) {
        app.noClickFunction(evt);
      } else if (app.numberCardAlreadyClicked === 1) {
        app.noClickFunction(evt);
        app.checkIfPaired(evt);
      }
    });
    app.createImage(card, value);
    app.createCache(card);

    return card;
  },
  noClickFunction: function(evt) {
    if (evt.target.className === 'cache') {
      evt.target.className = evt.target.className + 'clicked';
      evt.target.parentElement.className = evt.target.parentElement.className + 'clicked';
      app.numberCardAlreadyClicked++;
    } else {

    }
  },
  timeOutFunction: function() {
    setTimeout(app.pointerRevert, 1000);
  },
  checkIfPaired: function(evt) {
    var checkPairedArray = document.querySelectorAll('.carteclicked');
    // for (i = 0; i < checkPairedArray.length; i++) {
    // if (typeof (checkPairedArray[i]) !== 'undefined' && (checkPairedArray[i]) !== null) {

    if (checkPairedArray.length !== 2) {
      return;
    }

    // console.log(checkPairedArray[0], checkPairedArray[1]);
    if (checkPairedArray[0].dataset.number === checkPairedArray[1].dataset.number) {
      checkPairedArray[0].className = 'cartefound';
      checkPairedArray[1].className = 'cartefound';
      app.numberCardAlreadyClicked = 0;

      console.log(document.querySelectorAll('.cartefound').length);
      if (document.querySelectorAll('.cartefound').length === 28) {
        document.querySelector('h2').innerHTML = 'Et c\'est la victoire !!!';
      };
    } else {
      app.timeOutFunction();
    }

    // }
    // }
  },
  pointerRevert: function() {
    var revertArray = document.querySelectorAll('.cacheclicked');
    for (i = 0; i < revertArray.length; i++) {
      if (revertArray[i].parentElement.className !== 'cartefound') {
        revertArray[i].style.display = 'block';
        revertArray[i].className = 'cache';
        revertArray[i].parentElement.className = 'carte';
      }
    }
    app.numberCardAlreadyClicked = 0;
  },
  createImage: function(card, value) {
    var image = document.createElement('div');
    image.className = 'image';
    image.style = 'position: absolute;top: 0;left: 0';
    card.appendChild(image);
    image.style.backgroundPosition = '0px ' + (value * 100) + 'px';
  },
  createCache: function(parent) {
    var cache = document.createElement('div');
    cache.className = 'cache';
    cache.style = 'position: absolute;top: 0;left: 0';
    parent.appendChild(cache);
  }
};
// var timer = {
//   // attributs
//   $barre: document.querySelector('.barre'),
//   div: [],

//   // funtions
//   init: function() {
//     timer.$barre.innerHTML = 'TIMER';
//     setInterval(timer.generateDivs, 1000);
//   },
//   generateDivs: function() {
//     timer.div.push(timer.createRedDiv(0));
//     timer.$barre.appendChild(timer.div[0]);
//   },
//   createRedDiv: function(value) {
//     var redDiv = document.createElement('div');
//     redDiv.className = 'redDiv';
//     redDiv.style = 'position: relative';
//     redDiv.setAttribute('data-number', value);
//     // this.$barre.appendChild(redDiv);
//   }
// };

// le premier timer est un que j'ai tenté de faire tout seul. Le 2eme a été pique sur le net. Aucun des 2 ne fonctionne pour le moment.

var timer2 = {
  move: function() {
    var elem = document.getElementById('myBar');
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }
};
// document.addEventListener('DOMContentLoaded', app.init);
// document.querySelector('.button').addEventListener('click', timer.init);
document.querySelector('.button').addEventListener('click', app.init);
document.querySelector('.button').addEventListener('click', timer2.init);
