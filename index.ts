document.addEventListener("DOMContentLoaded", main)
function main() {

}
interface IDataSchema {
    header: string,
    logs: [
        { key: string, value: number }
    ]
}
class Chart {
    element: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    data: IDataSchema;
    constructor(id, data: IDataSchema) {

        this.element = <HTMLCanvasElement>document.getElementById(id);
        window.addEventListener("resize", e => this.setSize(e));
        this.ctx = this.element.getContext("2d");
        this.data = data;
        this.setSize(undefined);
    }
    setSize(e) {
        this.ctx.canvas.width = this.element.offsetWidth;
        this.ctx.canvas.height = this.element.offsetHeight;
        this.write();
    }
    write() {
        let big = 0;
        let small = this.data.logs[0].value;
        for (let i of this.data.logs) {
            if (i.value > big) big = i.value;
            if (i.value < small) small = i.value;
        }
        let gapX = this.ctx.canvas.width / this.data.logs.length;
        let x = 0;
        let y = this.ctx.canvas.height;
        for (let i = 0; i < this.data.logs.length; i++) {
            this.ctx.moveTo(x, y);
            x = gapX * (i + 1);
            y = this.ctx.canvas.height - ((((this.data.logs[i].value / big) * 100) * this.ctx.canvas.height) / 100);
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }
}