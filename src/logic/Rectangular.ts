import { Vector } from "./Vector";

export interface Rectangular {
    getWidth(): number;
    getHeigth(): number;
    getPosition(): Vector;
}
