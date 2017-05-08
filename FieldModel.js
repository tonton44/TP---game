// doit etendre la classe EventEmitter.js
function FieldModel(id) {
    EventEmitter.call(this);
    this.init(id);
}
FieldModel.prototype = Object.create(EventEmitter.prototype);
FieldModel.prototype.constructor = FieldModel


FieldModel.prototype.init = function (id) {
    this.id = id;
    this.setProgress(0);
    this.setWater(3);
};

FieldModel.prototype.grow = function () {
    if (this.progress >= 100) return;
    if (this.water > 0) {
        this.setProgress(this.progress + 1);
        this.setWater(this.water - 1);
    } else {
        this.setProgress(0);
    }
}

FieldModel.prototype.setProgress = function (progress) {
    if (progress > 0) {
        this.progress = progress < 100 ? progress : 100;
    } else {
        this.progress = 0
    }
    this.emit('setProgress', this);
}
FieldModel.prototype.setWater = function (water) {
    this.water = water > 0 ? water : 0;
    this.emit('setWater', this);
}    