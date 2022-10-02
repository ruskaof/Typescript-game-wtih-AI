import { KeysPressed } from "../KeysPressed";
import { WorldEntitiesKeeper } from "./WorldEntities";

export interface Entity {
    draw(
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeigth: number
    ): void;

    update(
        keysPressedP1: KeysPressed,
        keysPressedP2: KeysPressed,
        worldEntities: WorldEntitiesKeeper
    ): void;
}
