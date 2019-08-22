document.addEventListener("DOMContentLoaded", main);
function main() {
}
var Chart = /** @class */ (function () {
    function Chart(id, data) {
        var _this = this;
        this.element = document.getElementById(id);
        window.addEventListener("resize", function (e) { return _this.setSize(e); });
        this.ctx = this.element.getContext("2d");
        this.data = data;
        this.setSize(undefined);
    }
    Chart.prototype.setSize = function (e) {
        this.ctx.canvas.width = this.element.offsetWidth;
        this.ctx.canvas.height = this.element.offsetHeight;
        this.write();
    };
    Chart.prototype.write = function () {
        var big = 0;
        var small = this.data.logs[0].value;
        for (var _i = 0, _a = this.data.logs; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.value > big)
                big = i.value;
            if (i.value < small)
                small = i.value;
        }
        var gapX = this.ctx.canvas.width / this.data.logs.length;
        var x = 0;
        var y = this.ctx.canvas.height;
        for (var i = 0; i < this.data.logs.length; i++) {
            this.ctx.moveTo(x, y);
            x = gapX * (i + 1);
            y = this.ctx.canvas.height - ((((this.data.logs[i].value / big) * 100) * this.ctx.canvas.height) / 100);
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    };
    return Chart;
}());
