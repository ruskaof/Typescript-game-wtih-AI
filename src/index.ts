import { KeysPressed } from "./logic/KeysPressed";
import { Player } from "./logic/entity/Player";
import { Constants } from "./logic/Constants";
import { Entity } from "./logic/entity/Entity";

const canvas = <HTMLCanvasElement>document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player();
const keysPressed = new KeysPressed();
const worldEntities = new Set<Entity>();
worldEntities.add(player);

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    worldEntities.forEach((entity) => {
        entity.draw(ctx, canvas.width, canvas.height);
    });
}
animate();

function update() {
    worldEntities.forEach((entity) => {
        entity.update(keysPressed, worldEntities);
    });

    setTimeout(() => {
        update();
    }, 1000 / Constants.TICKRATE);
}
update();

window.addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "a": {
            keysPressed.left = true;
            break;
        }
        case "w": {
            keysPressed.up = true;
            break;
        }
        case "d": {
            keysPressed.right = true;
            break;
        }
        case "s": {
            keysPressed.down = true;
            break;
        }
        case " ": {
            keysPressed.space = true;
            break;
        }
    }
});

window.addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "a": {
            keysPressed.left = false;
            break;
        }
        case "w": {
            keysPressed.up = false;
            break;
        }
        case "d": {
            keysPressed.right = false;
            break;
        }
        case "s": {
            keysPressed.down = false;
            break;
        }
        case " ": {
            keysPressed.space = false;
            break;
        }
    }
});
