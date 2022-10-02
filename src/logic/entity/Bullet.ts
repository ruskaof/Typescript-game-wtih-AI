import { Rectangular } from "../Rectangular";
import { heigthToCanvas, widthToCanvas } from "../scaleSizeToCanvas";
import { Vector } from "../Vector";
import { Entity } from "./Entity";

export class Bullet implements Entity, Rectangular {
    private width = 0.025;
    private height = 0.015;
    private position: Vector;
    private velocity: Vector;
    ownerId: number;

    constructor(position: Vector, velocity: Vector, ownerId: number) {
        this.position = position;
        this.velocity = velocity;
        this.ownerId = ownerId;
    }
    getWidth(): number {
        return this.width;
    }
    getHeigth(): number {
        return this.width;
    }
    getPosition(): Vector {
        return this.position;
    }
    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeigth: number
    ): void {
        ctx.fillStyle = "gray";

        const canvasX = widthToCanvas(this.position.x, canvasWidth);
        const canvasY = heigthToCanvas(this.position.y, canvasHeigth);
        const canvasPlayerWidth = widthToCanvas(this.width, canvasWidth);
        const canvasPlayerHeigth = heigthToCanvas(this.height, canvasHeigth);

        ctx.fillRect(canvasX, canvasY, canvasPlayerWidth, canvasPlayerHeigth);
    }

    update(): void {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
}
