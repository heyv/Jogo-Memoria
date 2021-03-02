let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  F_setCard: function (id) {
    let V_card = this.V_cards.filter(V_card => V_card.id === id)[0];

    if (V_card.flipped || this.lockMode) {
      return false;
    }

    if (!this.firstCard) {
      this.firstCard = V_card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = V_card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  F_checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  F_clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  F_unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.F_clearCards();
  },

  F_checkGameOver: function () {
    return this.V_cards.filter(V_card => !V_card.flipped).length == 0;
  },

  V_techs: [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
  ],

  V_cards: null,

  F_createCardsFromTechs: function () {
    this.V_cards = [];

    this.V_techs.forEach(V_tech => {
      this.V_cards.push(this.F_createPairFromTech(V_tech));
    });
    this.V_cards = this.V_cards.flatMap(pair => pair);
    this.F_shuffleCards();
    return this.V_cards;
  },

  F_createPairFromTech: function (V_tech) {
    return [
      {
        id: this.F_createIdWihtTech(V_tech),
        icon: V_tech,
        flipped: false,
      },
      {
        id: this.F_createIdWihtTech(V_tech),
        icon: V_tech,
        flipped: false,
      },
    ];
  },

  F_createIdWihtTech: function (V_tech) {
    return V_tech + parseInt(Math.random() * 1000);
  },

  F_shuffleCards: function (V_cards) {
    let V_currentIndex = this.V_cards.length;
    let V_randomIndex = 0;

    while (V_currentIndex !== 0) {
      V_randomIndex = Math.floor(Math.random() * V_currentIndex);
      V_currentIndex--;

      //inverte os valores
      [this.V_cards[V_randomIndex], this.V_cards[V_currentIndex]] = [
        this.V_cards[V_currentIndex],
        this.V_cards[V_randomIndex],
      ];
    }
  },
};
