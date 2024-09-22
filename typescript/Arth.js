var Arth = /** @class */ (function () {
    function Arth() {
        this.n1 = 10;
        this.n2 = 20;
    }
    Arth.prototype.add = function () {
        console.log(this.n1 + this.n2);
    };
    return Arth;
}());
var obj = new Arth();
obj.add();
