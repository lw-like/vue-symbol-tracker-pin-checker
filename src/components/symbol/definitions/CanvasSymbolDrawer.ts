import { DimensionsVector } from "./CanvasSymbol.const";
import { SymbolCellArea, type IPoint } from "./SymbolCellArea";


export class CanvasSymbolDrawer {
    private areas: SymbolCellArea[] = CanvasSymbolDrawer.initAreas();
    private areasMap: Map<string, SymbolCellArea> = CanvasSymbolDrawer.mapAreas(this.areas);
    private symbolEdges: string[][] = [];
    private lastActiveEdgeId?: string;
    private isSelectionActive?: boolean;
    public onNewSymbol?: (data: string) => void;


    constructor(
        public canvas: HTMLCanvasElement | null,
        public ctx: CanvasRenderingContext2D | null,
        private isPreview?: boolean
    ) {
        if (isPreview) {
            return;
        }

        this.registerOnMousedown();
        this.registerOnMouseup();
        this.registerOnMousemove();
    }

    public renderStaticPreview(symbol: string): void {
        this.symbolEdges = JSON.parse(symbol);
        this.render()
    }

    public render(): void {
        this.recalculate();
        this.renderAreas();
        this.renderSelectedSymbolAreas();
    }

    private registerOnMousedown(): void {
        this.canvas && this.canvas.addEventListener('mousedown', (event: any) => {
            this.isSelectionActive = true;
        });
    }

    private registerOnMouseup(): void {
        this.canvas && this.canvas.addEventListener('mouseup', (event: any) => {
            this.isSelectionActive = false;
            this.symbolEdges.pop();
            this.onNewSymbol && this.onNewSymbol(JSON.stringify(this.symbolEdges));
            this.ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.symbolEdges.splice(0, this.symbolEdges.length);
        });
    }

    private registerOnMousemove(): void {
        this.canvas && this.canvas.addEventListener('mousemove', (event: any) => {
            const point = { x: event.layerX, y: event.layerY };
            this.detectMouseAreaCollision(point);
        });
    }

    private renderAreas(): void {
        this.areas.forEach((area: SymbolCellArea) => {
            this.ctx && area.render(this.ctx);
        });
    }

    private renderSelectedSymbolAreas(): void {
        this.symbolEdges.forEach(this.drawEdge.bind(this));
    }

    private recalculate(): void {
        this.areas.forEach((area: SymbolCellArea) => {
            area.setContainerWidth(this.canvas?.width);
            area.setContainerHeight(this.canvas?.height);
        });
    }

    private detectMouseAreaCollision(point: IPoint): SymbolCellArea | undefined {
        if (!this.isSelectionActive || !this.ctx) {
            return;
        }

        for (let i = 0; i < this.areas.length; i++) {
            const area = this.areas[i];
            if (area.id !== this.lastActiveEdgeId
                && area.detectColision(this.ctx, point)) {
                this.addNextEdgeNode(area.id)
                this.lastActiveEdgeId = area.id
                return area;
            }
        }
    }

    private addNextEdgeNode(node: string) {
        let currentEdge: string[] = [];
        if (this.symbolEdges.length === 0) {
            this.symbolEdges.push(currentEdge);
            currentEdge.push(node);
        } else if (this.symbolEdges[this.symbolEdges.length - 1].length === 1) {

            const nextEdge: string[] = [node];
            currentEdge = this.symbolEdges[this.symbolEdges.length - 1];
            currentEdge.push(node);
            this.symbolEdges.push(nextEdge);
        }

        this.renderSelectedSymbolAreas();
    }

    private drawLineBetweanAreas(a1: SymbolCellArea, a2: SymbolCellArea) {
        const p1 = a1.center;
        const p2 = a2.center;

        if (!p1 || !p2) {
            return;
        }

        this.drawLine(p1, p2);
    }

    private drawEdge(edge: string[]) {
        if (edge.length !== 2) {
            return
        }

        const a1 = this.areasMap.get(edge[0])!
        const a2 = this.areasMap.get(edge[1])!

        this.drawLine(a1.center!, a2.center!)
    }

    private drawLine(p1: IPoint, p2: IPoint) {
        if (!this.ctx) {
            return;
        }

        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.setLineDash([]);
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    static initAreas(): SymbolCellArea[] {
        const vector = DimensionsVector;
        const rows: SymbolCellArea[][] = vector.map(x => vector.map(y => { return new SymbolCellArea(x, y) }));
        let flattenedAreas: SymbolCellArea[] = [];

        rows.forEach((row) => {
            flattenedAreas = [...flattenedAreas, ...row];
        });

        return flattenedAreas;
    }

    static mapAreas(areas: SymbolCellArea[]): Map<string, SymbolCellArea> {
        const map = new Map<string, SymbolCellArea>();
        areas.forEach(element => {
            map.set(element.id, element);
        });

        return map;
    }
}