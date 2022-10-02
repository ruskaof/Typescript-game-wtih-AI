import { KeysPressed } from "./logic/KeysPressed";
import { Player } from "./logic/entity/Player";
import { Constants } from "./logic/Constants";
import { Entity } from "./logic/entity/Entity";
import "./style.css";
import { WorldEntitiesKeeper } from "./logic/entity/WorldEntities";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const player1 = new Player(1);
const player2 = new Player(2);

const keysPressedP1 = new KeysPressed();
const keysPressedP2 = new KeysPressed();
const worldEntities = new WorldEntitiesKeeper();

worldEntities.addPlayer(player1);
worldEntities.addPlayer(player2);

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    worldEntities.allEntities.forEach((entity) => {
        entity.draw(ctx, canvas.width, canvas.height);
    });
}
animate();

function update() {
    worldEntities.allEntities.forEach((entity) => {
        entity.update(keysPressedP1, keysPressedP2, worldEntities);
    });

    setTimeout(() => {
        update();
    }, 1000 / Constants.TICKRATE);
}
update();

window.addEventListener("keydown", ({ key }) => {
    switch (key) {
        case "a": {
            keysPressedP1.left = true;
            break;
        }
        case "w": {
            keysPressedP1.up = true;
            break;
        }
        case "d": {
            keysPressedP1.right = true;
            break;
        }
        case "s": {
            keysPressedP1.down = true;
            break;
        }
        case " ": {
            keysPressedP1.shoot = true;
            break;
        }

        case "ArrowUp": {
            keysPressedP2.up = true;
            break;
        }
        case "ArrowDown": {
            keysPressedP2.down = true;
            break;
        }
        case "ArrowLeft": {
            keysPressedP2.left = true;
            break;
        }
        case "ArrowRight": {
            keysPressedP2.right = true;
            break;
        }
        case "Control": {
            keysPressedP2.shoot = true;
            break;
        }
    }
});

window.addEventListener("keyup", ({ key }) => {
    switch (key) {
        case "a": {
            keysPressedP1.left = false;
            break;
        }
        case "w": {
            keysPressedP1.up = false;
            break;
        }
        case "d": {
            keysPressedP1.right = false;
            break;
        }
        case "s": {
            keysPressedP1.down = false;
            break;
        }
        case " ": {
            keysPressedP1.shoot = false;
            break;
        }

        case "ArrowUp": {
            keysPressedP2.up = false;
            break;
        }
        case "ArrowDown": {
            keysPressedP2.down = false;
            break;
        }
        case "ArrowLeft": {
            keysPressedP2.left = false;
            break;
        }
        case "ArrowRight": {
            keysPressedP2.right = false;
            break;
        }
        case "Control": {
            keysPressedP2.shoot = false;
            break;
        }
    }
});
