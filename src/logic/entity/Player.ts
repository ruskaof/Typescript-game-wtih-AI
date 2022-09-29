import { Constants } from "../Constants";
import { Drawabale } from "./Drawable";
import { Updatable } from "./Updatable";
import { Vector } from "../Vector";
import { heigthToCanvas, widthToCanvas } from "../scaleSizeToCanvas";
import { KeysPressed } from "../KeysPressed";

export class Player implements Drawabale, Updatable {
    width = 0.025;
    height = 0.025;
    position: Vector = new Vector(0.5, 0.5);
    velocity: Vector = new Vector(0, 0);

    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeigth: number
    ) {
        ctx.fillStyle = "red";

        const canvasX = widthToCanvas(this.position.x, canvasWidth);
        const canvasY = heigthToCanvas(this.position.y, canvasHeigth);
        const canvasPlayerWidth = widthToCanvas(this.width, canvasWidth);
        const canvasPlayerHeigth = heigthToCanvas(this.height, canvasHeigth);

        ctx.fillRect(canvasX, canvasY, canvasPlayerWidth, canvasPlayerHeigth);
    }

    update(keysPressed: KeysPressed) {
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.x + this.width > 1) {
            this.position.x = 1 - this.width;
            this.velocity.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
        if (this.position.y + this.height > 1) {
            this.position.y = 1 - this.height;
            this.velocity.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        // if (this.position.y + this.height < 1) {
        //     this.velocity.y += Constants.GRAVITY;
        // } else {
        //     this.velocity.y = 0;
        // }
        this.velocity.y += Constants.GRAVITY;

        if (keysPressed.right) {
            this.velocity.x += 0.001;
        } else if (keysPressed.left) {
            this.velocity.x -= 0.001;
        } else {
            this.velocity.x = 0;
        }

        if (keysPressed.up && this.velocity.y >= 0) {
            this.velocity.y = -Constants.GRAVITY * 10;
        }

        console.log(`${this.velocity.y}`);
    }
}
