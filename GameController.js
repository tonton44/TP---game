function GameController(gameView, gameModel, fieldModels) {
    this.init(gameView, gameModel, fieldModels);
}

GameController.prototype.constructor = GameController;

GameController.prototype.init = function (gameView, gameModel, fieldModels) {
    this.gameView = gameView;
    this.gameModel = gameModel;
    this.fieldModels = fieldModels;

    this.gameView.on('irriguateField', this.irriguateField);
    this.gameView.on('harvestField', this.harvestField);
    this.gameView.on('showModalWater', this.pauseGame.bind(this));
    this.gameView.on('hideModalWater', this.playGame.bind(this));
    this.gameView.on('initGame', this.initGame.bind(this));
    this.gameView.on('buyWater', this.buyWater);
};
GameController.prototype.initGame = function (name) {
    this.gameModel.setName(name)
    this.playGame();
}


GameController.prototype.playGame = function () {
    this.pauseGame
    this.timer = window.setInterval(this.gameTick.bind(this), 1000);
}

GameController.prototype.pauseGame = function () {
    window.clearInterval(this.timer);
}

GameController.prototype.gameTick = function () {
    this.fieldModels.forEach(function (field) {
        field.grow();
    });
    this.checkEndGame();
}

GameController.prototype.checkEndGame = function () {
    let fieldChaos = true;
    this.fieldModels.forEach(function (field) {
        if (field.water != 0 || field.progress === 100) {
            fieldChaos = false;
        }
    });
    if (this.gameModel.money < this.gameModel.changeRate && gameModel.water === 0 && fieldChaos) {
        this.pauseGame();
        this.gameModel.setLost(true);
    }
};

GameController.prototype.irriguateField = function (field) {

    if (this.gameModel.water > 0) {
        this.gameModel.setWater(this.gameModel.water - 1);
        field.setWater(field.water + 1);
        console.log(field.water)
    }
}
GameController.prototype.harvestField = function (field) {

    if (field.progress === 100) {
        this.gameModel.setMoney(this.gameModel.money + 40);
        this.gameModel.setScore(this.gameModel.score + 1);
        field.setProgress(0);
    }
}
GameController.prototype.buyWater = function (waterQty) {
    gameModel.setMoney(this.gameModel.money - waterQty);
    gameModel.setWater(this.gameModel.water + waterQty);
}



