import { Constants } from "./Constants";
import { Vector } from "./Vector";

export class Player {
    position: Vector = new Vector(100, 100);
    velocity: Vector = new Vector(0, 0);
    width = 30;
    height = 30;

    private draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx: CanvasRenderingContext2D, canvasHeight: number) {
        if (this.position.y + this.height + this.velocity.y <= canvasHeight) {
            this.velocity.y += Constants.GRAVITY;
        } else {
            this.velocity.y = 0;
        }

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        this.draw(ctx);
    }
}
