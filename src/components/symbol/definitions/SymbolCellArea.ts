import { DimensionsVector } from "./CanvasSymbol.const";

export interface IPoint {
    x: number;
    y: number;
}

export interface ISymbolCellArea extends IPoint {
    id: string;
    width?: number;
    height?: number;
}

export class SymbolCellArea implements ISymbolCellArea {
    id: string;
    width?: number | undefined;
    height?: number | undefined;
    colider: any;

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {
        this.id = `${x}${y}`;
    }

    setContainerWidth(value?: number) {
        this.width = this.getAreaWidth(value);
    }

    setContainerHeight(value?: number) {
        this.height = this.getAreaHeight(value);
    }

    get center(): IPoint | undefined {
        if (!this.width || !this.height) {
            return;
        }

        const xIndex = this.x - 1;
        const yIndex = this.y - 1;

        return {
            x: (this.width * xIndex) + this.width / 2,
            y: (this.height * yIndex) + this.height / 2,
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this.width || !this.height) {
            return
        }

        const lineWidth = .05;
        const x = this.x - 1;
        const y = this.y - 1;
        let width = this.width;
        let height = this.height;
        let xPos = x * this.width;
        let yPos = y * this.height;

        if (x > 0) {
            xPos -= lineWidth * x;
            width -= lineWidth * x;
        }

        if (y > 0) {
            yPos -= lineWidth * y;
            height -= lineWidth * y;
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.setLineDash([5, 35]);
        ctx.rect(xPos, yPos, width, height!);
        ctx.stroke();

        // Set coloider
        if (this.center) {
            ctx.beginPath();
            this.colider = new Path2D();
            this.colider.arc(this.center.x, this.center.y, 55, 0, 2 * Math.PI);
            // ctx.fill(this.colider)
        }
    }

    detectColision(ctx: CanvasRenderingContext2D, point: IPoint): boolean {
        return ctx.isPointInPath(this.colider, point.x, point.y);
    }

    private getAreaWidth(value?: number) {
        return (value || 0) / DimensionsVector.length;
    }

    private getAreaHeight(value?: number) {
        return (value || 0) / DimensionsVector.length;
    }
}