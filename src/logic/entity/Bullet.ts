import { heigthToCanvas, widthToCanvas } from "../scaleSizeToCanvas";
import { Vector } from "../Vector";
import { Entity } from "./Entity";

export class Bullet implements Entity {
    width = 0.025;
    height = 0.015;
    position: Vector;
    velocity: Vector;

    constructor(position: Vector, velocity: Vector) {
        this.position = position;
        this.velocity = velocity;
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
