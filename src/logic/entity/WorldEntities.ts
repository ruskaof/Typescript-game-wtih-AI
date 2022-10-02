import { Bullet } from "./Bullet";
import { Entity } from "./Entity";
import { Player } from "./Player";

export class WorldEntitiesKeeper {
    allEntities: Set<Entity> = new Set();
    bullets: Set<Bullet> = new Set();
    players: Set<Player> = new Set();

    addPlayer(player: Player) {
        this.players.add(player);
        this.allEntities.add(player);
    }

    addBullet(bullet: Bullet) {
        this.bullets.add(bullet);
        this.allEntities.add(bullet);
    }
}
