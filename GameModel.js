// doit etendre la classe EventEmitter.js
function GameModel() {
    EventEmitter.call(this);
    this.init();
}

GameModel.prototype = Object.create(EventEmitter.prototype);
GameModel.prototype.constructor = GameModel


GameModel.prototype.init = function (){
    this.setMoney(50);
    this.setScore(0);
    this.setWater(300);
    this.changeRate = 1.5;
    this.lost = false;
};
GameModel.prototype.setName = function (name) {
    this.name = name;
    this.emit('setName', this.name);
}

GameModel.prototype.setMoney = function (money) {
    this.money = money;
    this.emit('setMoney', this.money);
}

GameModel.prototype.setScore = function (score) {
    this.score = score;
    this.emit('setScore', this.score);
}
GameModel.prototype.setWater = function (water) {
    this.water = water;
    this.emit('setWater', this.water);
}
GameModel.prototype.setLost = function (bool) {
    this.lost = bool;
    if(this.lost) {
        var onSuccess = function (r) {
             this.emit('gameLost', r.list);
        };
        var onError = function (jq, status, error) {
            console.log(jq);
            console.log(status);
            console.log(error);
        };
        var onComplete = function () {
            console.log('Complete');
        };

        $.ajax({
            url: 'http://10.1.206.10:3000/scores',
            type: 'POST',
            data: {name: this.name, score: this.score},
            success: onSuccess.bind(this),
            error: onError,
            complete: onComplete
        })
    }
}

