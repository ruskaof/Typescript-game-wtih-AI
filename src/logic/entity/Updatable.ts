import { KeysPressed } from "../KeysPressed";

export interface Updatable {
    update(keysPressed: KeysPressed): void;
}
