import { Coordinates } from "./types/Coordinates";
import { Directions } from "./types/Directions";

export class Move {
    public execute(
        direction: Directions, 
        position: Coordinates
    ): Coordinates {
        const [x, y] = position;
    
        if (direction === "N") return [x, y + 1];
        if (direction === "L") return [x + 1, y];
        if (direction === "S") return [x, y - 1];
        if (direction === "O") return [x - 1, y];
    
        return position;
    };
}