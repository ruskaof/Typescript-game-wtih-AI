import { KeysPressed } from "./logic/KeysPressed";
import { Player } from "./logic/entity/Player";
import { Constants } from "./logic/Constants";

const canvas = <HTMLCanvasElement>document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player();
const keysPressed = new KeysPressed();

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx, canvas.width, canvas.height);
}
animate();

function update() {
    player.update(keysPressed);

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
    }
});
