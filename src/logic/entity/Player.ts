import { Constants } from "../Constants";
import { Vector } from "../Vector";
import { heigthToCanvas, widthToCanvas } from "../scaleSizeToCanvas";
import { KeysPressed } from "../KeysPressed";
import { Entity } from "./Entity";
import { Direction } from "../Direction";
import { Bullet } from "./Bullet";
import { WorldEntitiesKeeper } from "./WorldEntities";
import { rectanglesCollide } from "../collision";
import { Rectangular } from "../Rectangular";

export class Player implements Entity, Rectangular {
    private width = 0.025;
    private height = 0.025;
    private position: Vector;
    private velocity: Vector = new Vector(0, 0);
    private lastBulletShootTimeMills = performance.now();
    private direction = Direction.RIGHT;
    private playerId: 1 | 2;
    private color = "red";

    constructor(playerId: 1 | 2) {
        this.playerId = playerId;
        if (playerId == 1) {
            this.position = new Vector(0.1, 1 - this.height - 0.1);
        } else {
            this.position = new Vector(
                1 - this.width - 0.1,
                1 - this.height - 0.1
            );
        }
    }

    getWidth(): number {
        return this.width;
    }
    getHeigth(): number {
        return this.height;
    }
    getPosition(): Vector {
        return this.position;
    }

    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeigth: number
    ) {
        ctx.fillStyle = this.color;

        const canvasX = widthToCanvas(this.position.x, canvasWidth);
        const canvasY = heigthToCanvas(this.position.y, canvasHeigth);
        const canvasPlayerWidth = widthToCanvas(this.width, canvasWidth);
        const canvasPlayerHeigth = heigthToCanvas(this.height, canvasHeigth);

        ctx.fillRect(canvasX, canvasY, canvasPlayerWidth, canvasPlayerHeigth);
    }

    update(
        keysPressedP1: KeysPressed,
        keysPressedP2: KeysPressed,
        worldEntities: WorldEntitiesKeeper
    ) {
        let keysPressed: KeysPressed;
        if (this.playerId == 1) {
            keysPressed = keysPressedP1;
        } else {
            keysPressed = keysPressedP2;
        }
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
            this.velocity.x = Constants.PLAYER_VELOCITY;
        } else if (keysPressed.left) {
            this.velocity.x = -Constants.PLAYER_VELOCITY;
        } else {
            this.velocity.x = 0;
        }

        if (keysPressed.up && this.isOnGround()) {
            this.velocity.y = -Constants.JUMP_VELOCITY;
        }

        if (keysPressed.shoot) {
            if (performance.now() - this.lastBulletShootTimeMills >= 500) {
                this.shoot(worldEntities);
                this.lastBulletShootTimeMills = performance.now();
            }
        }

        this.handleBulletHit(worldEntities);
    }

    private shoot(worldEntities: WorldEntitiesKeeper) {
        let bulletVelocity: Vector;
        if (this.direction == Direction.RIGHT) {
            bulletVelocity = new Vector(Constants.BULLET_VELOCITY, 0);
        } else {
            bulletVelocity = new Vector(-Constants.BULLET_VELOCITY, 0);
        }
        worldEntities.addBullet(
            new Bullet(
                new Vector(this.position.x, this.position.y),
                bulletVelocity,
                this.playerId
            )
        );
    }

    private isOnGround(): boolean {
        return this.position.y + this.height >= 1;
    }

    private handleBulletHit(worldEntities: WorldEntitiesKeeper) {
        worldEntities.bullets.forEach((bullet) => {
            if (
                rectanglesCollide(this, bullet) &&
                bullet.ownerId != this.playerId
            ) {
                this.color = "green";
            }
        });
    }
}
