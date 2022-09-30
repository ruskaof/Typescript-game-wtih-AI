import { KeysPressed } from "../KeysPressed";

export interface Entity {
    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeigth: number
    ): void;

    update(keysPressed: KeysPressed, worldEntities: Set<Entity>): void;
}
