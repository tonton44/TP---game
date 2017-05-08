var gameModel = {}
var gameView = {}
var gameController = {}
var fieldsNumber = 3



$(function () {
    // field1 = new FieldModel (); (on aurait pu initialiser les champs un par un)
    // mais la meilleur methode est : Initialisation de chaque champs avec un for
    var fields = [];
    for (var i = 0; i < fieldsNumber; i++) {
        var field = new FieldModel(i);
        fields.push(field);
    }

    gameModel = new GameModel();
    gameView = new GameView(gameModel, fields);
    gameController = new GameController(gameView, gameModel, fields)
})