import { Rectangular } from "./Rectangular";

export function rectanglesCollide(r1: Rectangular, r2: Rectangular): boolean {
    return (
        r1.getPosition().x + r1.getWidth() >= r2.getPosition().x &&
        r1.getPosition().x <= r2.getPosition().x + r2.getWidth() &&
        r1.getPosition().y + r1.getHeigth() >= r2.getPosition().y &&
        r1.getPosition().y <= r2.getPosition().y + r2.getHeigth()
    );
}
