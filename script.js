const V_front = 'card_front';
const V_back = 'card_back';
let V_CARD = 'card';
let V_ICON = 'icon';

F_startGame();

function F_startGame() {
  F_initaializeCards(game.F_createCardsFromTechs());
}

function F_initaializeCards(V_cards) {
  let V_gameBoard = document.getElementById('gameBoard');
  V_gameBoard.innerHTML = '';
  game.V_cards.forEach(V_card => {
    let V_cardElement = document.createElement('div');
    V_cardElement.id = V_card.id;
    V_cardElement.classList.add(V_CARD);
    V_cardElement.dataset.icon = V_card.icon;

    F_createCardContent(V_card, V_cardElement);

    V_cardElement.addEventListener('click', F_flipCard);
    V_gameBoard.appendChild(V_cardElement);
  });
}

function F_createCardContent(V_card, V_cardElement) {
  F_createCardFace(V_front, V_card, V_cardElement);
  F_createCardFace(V_back, V_card, V_cardElement);
}

function F_createCardFace(V_face, V_card, V_cardElement) {
  let V_cardElementFace = document.createElement('div');
  V_cardElementFace.classList.add(V_face);
  if (V_face === V_front) {
    let V_iconElement = document.createElement('img');
    V_iconElement.classList.add(V_ICON);
    V_iconElement.src = './assets/' + V_card.icon + '.png';
    V_cardElementFace.appendChild(V_iconElement);
  } else {
    V_cardElementFace.innerHTML = '&lt/&gt';
  }
  V_cardElement.appendChild(V_cardElementFace);
}

//prettier-ignore
function F_flipCard() {
  if (game.F_setCard(this.id)) {
    
    this.classList.add('flip');
      if (game.secondCard) {
        if (game.F_checkMatch()) {
          game.F_clearCards();
          if(game.F_checkGameOver()){
            let gameOverLayer = document.getElementById("gameOver");
            gameOverLayer.style.display = 'flex';
          }
        } else {
          setTimeout(() => {
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);

            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.F_unflipCards();
          }, 1000);
        }
      }
   }
}

function F_restart() {
  game.F_clearCards();
  F_startGame();
  let V_gameOverlayer = document.getElementById('gameOver');
  V_gameOverlayer.style.display = 'none';
}
