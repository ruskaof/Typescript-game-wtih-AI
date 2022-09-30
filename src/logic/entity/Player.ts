import { Constants } from "../Constants";
import { Vector } from "../Vector";
import { heigthToCanvas, widthToCanvas } from "../scaleSizeToCanvas";
import { KeysPressed } from "../KeysPressed";
import { Entity } from "./Entity";
import { Direction } from "../Direction";
import { Bullet } from "./Bullet";

export class Player implements Entity {
    width = 0.025;
    height = 0.025;
    position: Vector = new Vector(0.5, 0.5);
    velocity: Vector = new Vector(0, 0);
    lastBulletShootTimeMills = performance.now();
    direction = Direction.RIGHT;

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

    update(keysPressed: KeysPressed, worldEntities: Set<Entity>) {
        if (this.velocity.x > 0) this.direction = Direction.RIGHT;
        if (this.velocity.x < 0) this.direction = Direction.LEFT;

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

        this.velocity.y += Constants.GRAVITY;

        if (keysPressed.right) {
            this.velocity.x = 0.015;
        } else if (keysPressed.left) {
            this.velocity.x = -0.015;
        } else {
            this.velocity.x = 0;
        }

        if (keysPressed.up && this.isOnGround()) {
            this.velocity.y = -Constants.GRAVITY * 10;
        }

        if (keysPressed.space) {
            if (performance.now() - this.lastBulletShootTimeMills >= 500) {
                this.shoot(worldEntities);
                this.lastBulletShootTimeMills = performance.now();
            }
        }
    }

    private shoot(worldEntities: Set<Entity>) {
        let bulletVelocity: Vector;
        if (this.direction == Direction.RIGHT) {
            bulletVelocity = new Vector(0.01, 0);
        } else {
            bulletVelocity = new Vector(-0.01, 0);
        }
        worldEntities.add(
            new Bullet(
                new Vector(this.position.x, this.position.y),
                bulletVelocity
            )
        );
    }

    private isOnGround(): boolean {
        return this.position.y + this.height >= 1;
    }
}
