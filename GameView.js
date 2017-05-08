// View.js
function GameView(gameModel, fieldModels) {
    EventEmitter.call(this);
    this.init(gameModel, fieldModels);
}

GameView.prototype = Object.create(EventEmitter.prototype);
GameView.prototype.constructor = GameView;

GameView.prototype.init = function (gameModel, fieldModels) {
    this.gameModel = gameModel;
    this.fieldModels = fieldModels;

    this.gameModel.on('setMoney', this.refreshMoney);
    this.gameModel.on('setScore', this.refreshScore);
    this.gameModel.on('setWater', this.refreshWater);
    this.gameModel.on('setName', this.refreshName);
    this.gameModel.on('gameLost', this.endGame);


    this.refreshMoney(this.gameModel.money);
    this.refreshWater(this.gameModel.water);
    this.refreshScore(this.gameModel.score);
    this.refreshName(this.gameModel.name);

    var that = this;

    $('#ModalWater').on('show.bs.modal', function (e) {
        that.emit('showModalWater')
    });
    $('#ModalWater').on('hide.bs.modal', function (e) {
        that.emit('hideModalWater')
    });

    $('#waterQuantity').on('input', function (e) {
        var amount = parseInt($(this).val()) * that.gameModel.changeRate;

        if (amount > that.gameModel.money) {
            $('#confirmBuy').prop('disabled', true);
            $('#priceDisplay').css('color', 'red');
        } else {
            $('#confirmBuy').prop('disabled', false);
            $('#priceDisplay').css('color', 'green');
        }
        $('#priceDisplay span').text(amount);
    });

    $('#confirmBuy').on('click', function (e) {
        var waterQty = $('#waterQuantity').val();
        that.emit('buyWater', waterQty);
    });
    for (var i = 0; i < this.fieldModels.length; i++) {
        let field = this.fieldModels[i];
        field.on('setWater', this.refreshFieldWater);
        field.on('setProgress', this.refreshFieldProgress);
        this.refreshFieldWater(field);
        this.refreshFieldProgress(field);
        $('#fields').on('click', '#field-' + field.id + ' .btn', function () {
            that.emit('irriguateField', field);
        });
        $('#fields').on('click', '#field-' + field.id + ' .btn.harvest', function () {
            that.emit('harvestField', field);
        });
    }

    $('#ModalStart').modal('show');

    $('#confirmName').on('click', function (e) {
        var name = $('#name').val();
        if (name.length <= 3) {
            alert('Name too short')
        } else {
            $('#ModalStart').modal('hide');
            that.emit('initGame', name)
        }

    });
}



GameView.prototype.refreshMoney = function (money) {

    $('#money').find('span').text(money)
}

GameView.prototype.refreshScore = function (score) {

    $('#score').find('span').text(score)
}

GameView.prototype.refreshWater = function (water) {

    $('#water').find('span').text(water)
}

GameView.prototype.refreshName = function (name) {

    $('#playername').text(name)
    
};

GameView.prototype.refreshFieldWater = function (field) {
    $('#field-' + field.id + ' .WaterGauge span').text(field.water);
};

GameView.prototype.refreshFieldProgress = function (field) {
    $('#field-' + field.id + ' .field span').text(field.progress);
};
GameView.prototype.endGame = function (r) {
    r.forEach (function (line) {
         $('#scoreList').append(line.name + "-" + line.score);
    });
    $('#ModalEnd').modal('show');
};
