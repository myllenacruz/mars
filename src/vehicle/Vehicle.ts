import { VehicleState, Directions, Coordinates } from "@vehicle/types";

export class Vehicle {
    public initalState(
        location: string,
        position?: Coordinates
    ): VehicleState {
        const [x, y, direction] = location.split(" ");
    
        return { 
            direction: direction as Directions, 
            position: position || [parseInt(x), parseInt(y)] 
        };
    }
}