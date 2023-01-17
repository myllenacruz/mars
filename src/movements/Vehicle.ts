import { VehicleMovements } from "./types/VehicleMovements";
import { Directions } from "./types/Directions";
import { Coordinates } from "./types/Coordinates";

export class Vehicle {
    public initalState(
        location: string,
        position?: Coordinates
    ): VehicleMovements {
        const [x, y, direction] = location.split(" ");
    
        return { 
            direction: direction as Directions, 
            position: position || [parseInt(x), parseInt(y)] 
        };
    }
}