# Feedback du prof

## Etape 1 : On installe

### Enoncé

- Création du header en HTML
- Création du plateau (conteneur des cartes) en HTML
- Création des 28 `.carte` avec une boucle
- CSS des cartes en 100 x 100 pixels
- Création de 2 enfants `.cache` et `.image` dans chaque `.carte`

### Notions

- [x] Syntaxe HTML (header et plateau)
- [x] Boucle `for` de création des 28 `.carte`
- [x] Utilisation de `document.createElement()` ou `$('<div>')` pour créer les cartes
- [x] Styliser les `.carte` à l'aide de la classe CSS
- [x] Utilisation de `appendChild` ou `append` pour ajouter les `.cache` et `.image` dans `.carte`

### Commentaires

- Bonne pratique, le `$` dans les noms des variables qui contiennent un objet jQuery :+1:
- Moins bonne pratique, les noms de variables pas très explicites comme `element` ou `iVR`
- Je n’ai pas compris pourquoi tu générais `iV` en dehors de `app`
- Sur la ligne `for (var i = 0, l = app.iVR.length; i < l; i++) {` tu n’as pas besoin de créer la variable `l`, tu peux aussi faire directement : `for (var i = 0; i < app.iVR.length; i++) {`
- Indice pour anticiper sur les bonus : le premier paramètre que tu vas pouvoir faire bouger pour créer un niveau plus simple ou plus dur, c'est le nombre de cartes présentes sur le plateau. Tu peux enregistrer l'information du nombre de cartes courant (et donc de la difficulté) dans les propriétés de ton jeu.
- Sinon, nickel :thumbsup:





## Etape 2 : On retourne

### Enoncé

- Gérer l'évènement du `click` sur une carte
- Afficher `.image` et masquer `.cache`
- Mettre un effet de `hover` sur les cartes

### Notions

- [x] Utiliser `.addEventListener()` ou `.on()` pour gérer le clic sur une carte
- [x] Gérer l'affichage de `.image` et `.cache`
- [x] Syntaxe CSS pour le `hover`

### Commentaires

- Pour l’eventListener c’est tout à fait ça ! Par contre, pour la lisibilité, tu peux isoler l’action de ton callback dans une fonction à part entière - `app.cardClicked` par exemple.
- Sinon, RAS :ok_hand:



## Etape 3 : La face visible

### Enoncé

- Utiliser le fichier `cards.png` pour afficher les images des fruits
- Définir la position de chaque image avec `background-position`
- Mélanger les cartes sur le plateau

### Notions

- [x] Gérer l'affichage des cartes avec la méthode du _sprite_ en CSS
- [x] Utilisation du `background-position` pour afficher chaque image sur `.carte`
- [x] Mélanger les cartes avec un `Math.random()`

### Commentaires

- Pour les images, lister tous les background:position "en dur" n'est pas la meilleure des solutions. Tu peux les calculer en JS, dans ta boucle. Non seulement c'est plus rapide, mais en plus ça évite les erreurs manuelles, et c'est beaucoup plus "maintenable". Imagine par exemple qu'on te demande une version "facile" avec moins de cartes, et une difficile avec cent cartes. Ou bien si finalement l'image source qu'on te donne change et la hauteur des images est de 150px... Laisse l'ordi calculer les background-position, c'est son job de faire les maths :wink:
- Au moment où tu crées l’image, par exemple, tu peux passer à ta fonction le numéro de fruit que tu as mis comme data-number. Ensuite, quand tu crées la div, tu peux calculer à partir de ce numéro la position de background à lui donner (j’ai vu que tu avais utilisé `card.style` plus haut, cette étape ne devrait donc pas te poser de problème particulier).  Edit : je n’avais pas vu mais en fait tu as apparemment déjà fait des essais dans ce sens, je vois, au niveau des `acquireImage` qui sont commentés. Par contre, tu es parti très très loin, non ? Je n'arrive pas à voir ce que tu voulais faire.
- Tu n’as pas besoin de répéter la propriété `background-image` sur chaque carte, tu peux le faire en une seule ligne sur toutes à la fois, dans ton css.
- Bien joué pour le mélange des cartes ;)





## Etape 4 : Une paire ?

### Enoncé

- Gestion des paires
- `interval` de 1 seconde après avoir retourné 2 mauvaises cartes

### Notions

- [ ] Enregistrer la première carte retournée et la comparer à la deuxième
- [x] Masquer les mauvaises paires en interchangeant `.image` et `.cache`
- [ ] Sauvegarder le fait qu'on trouve une paire
- [ ] Gestion du timer qui empêche de retourner d'autres cartes pendant 1 seconde

### Commentaires

- L’utilisation des pointer-events ici était assez inattendue. C’est un détournement de sa fonction originale (mettre la propriété à `none` a pour effet de faire « descendre » le ciblage de l’événement sur l’enfant de l’élément cliqué, et non de supprimer l’écouteur d’événement) Pourquoi pas !
- L’appel à `app.pointerRevert();` doit être conditionnel (on ne le fera pas si une paire a été retournée), donc tu auras probablement besoin de déplacer l’appel à cette fonction à l’intérieur de `checkIfPaired`.
- Compter le nombre de cartes retournées et leur donner une classe spécifique était un bon départ, mais je vois que tu as des difficultés pour les comparer avec ça. Je te propose une autre solution : récupérer les objets cartes cliqués (oui, tu peux effectivement les cilbler avec `parentNode`, c’est tout à fait ça), et les stocker dans des propriétés de l’objet (`app.card1` et `app.card2` par exemple). Comme ça, après, tu peux obtenir le `data-number` de chacune et déterminer s’il s’agit d’une paire ou non. Et bonus, du coup pas besoin d’insérer réellement le chiffre à l’intérieur de chaque carte.
- En théorie, les mauvaises paires sont censées se retourner toutes seules au bout d’une seconde _et_ on ne peut pas cliquer sur d’autres cartes pendant ce temps là. Tu vas avoir besoin d’un `setTimeout` pour cette partie :)




## Etape 5 : Veni, Vidi, Vici

### Enoncé

- À chaque paire trouvée, on regarde si on a gagné ou pas
- Afficher un message de félicitations en cas de victoire

### Notions

<details>
<summary>Spoiler alert</summary>

- [ ] Garder en mémoire le nombre de paires trouvées (avec un `app.cardMatch = 0` par exemple)
- [ ] Si toutes les paires ont été trouvées (`app.cardMatch === 14`), afficher un message `alert` de victoire
</details>

### Commentaires

- Il y a plusieurs façons de savoir si on a gagné ou pas, l'important est de choisir une solution sûre et lisible (en terme de code). Je n'en dis donc pas plus !






## Etape 6 : Compte à rebours

### Enoncé

- Afficher une barre de progression de 60 secondes
- Chaque seconde, mettre à jour la barre de progression
- Si 60 secondes s'écoulent sans avoir gagné la partie, afficher un message d'échec
- Recharger la page en cas d'échec

### Notions

<details>
<summary>Spoiler alert</summary>

- [ ] Utiliser une `div` dont le `width` va de 0 à 100%
- [ ] Créer un `interval` d'une seconde qui met à jour le `width` de la `div` de progression
- [ ] Si 60 secondes d'écoulées, afficher un message d'échec
- [ ] Recharger la page avec un `window.location.reload()` ou une redirection
</details>

### Commentaires

- Cette partie est finalement assez indépendante des exercices précédents, tu peux la faire à n'importe quel moment (utile si tu bloques).



## 7 : Bonus

### Enoncé

- Petite animation 3D du retournement des cartes
- Plusieurs niveaux de difficulté, accessibles via des boutons
- Enregistrement des meilleurs scores

### Commentaires

<details>
<summary>Spoiler alert</summary>

- Je ne te dis rien sur les animations, ça tu devrais pouvoir trouver facilement.
- Pour les niveaux de difficulté on en a déjà parlé, tu sais que la principale piste est de se reposer sur des propriétés pour définir certains paramètres de la partie.
- Comme il faut que le jeu ne commence qu'une fois le niveau de difficulté choisi, tu vas peut-être avoir besoin de différer l'appel au app.init...
- Pour garder une trace des meilleurs scores, c'est [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) qui va t'intéresser. Bien évidemment, ça ne permettra de sauvegarder et afficher uniquement les meilleurs scores du joueur puisque c'est stocké en local.
- Rien ne t'empêche d'imaginer un stockage avec base de données pour pouvoir comparer les scores des copains, mais ça deviendra du méga, méga bonus alors :grin:
</details>



## Général

- Qualité du code
  - [x] Indentation et lisibilité du code
  - [ ] Présence de commentaires dans le code


### Pistes de révisions

- [Les timers](https://github.com/O-clock-Alumni/fiches-recap/blob/master/js/objectifs.md#ex%C3%A9cuter-quelque-chose-apr%C3%A8s-un-certain-temps)


### Commentaires

Pas mal du tout ! Tu te donnes à fond sur cet exo, et ça se sent. Je vois que niveau syntaxe JS tu es assez à l'aise.

Au final, après avoir fini ce memory, l'essentiel du boulot pour toi maintenant va être de travailler à la simplification de ton code - oui, faire simple, c'est difficile - et à sa lisibilité, pour anticiper sur le code en équipe : les commentaires, les noms de variables etc... Mais je comprends bien, pour l'instant tu es surtout en mode exploratoire :)
