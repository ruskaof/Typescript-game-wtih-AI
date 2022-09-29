import { KeysPressed } from "./logic/KeysPressed";
import { Player } from "./logic/Player";

const canvas = <HTMLCanvasElement>document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const player = new Player();
const keysPressed = new KeysPressed();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update(ctx, canvas.height);

    if (keysPressed.right) {
        player.velocity.x += 5;
    } else if (keysPressed.left) {
        player.velocity.x -= 5;
    } else {
        player.velocity.x = 0;
    }

    if (keysPressed.up) {
        player.velocity.y -= 5;
    }
}
animate();

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
