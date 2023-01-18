import { Coordinates, VehicleState, Directions } from "@vehicle/types";

export class Move {
    public execute(
        vehicleState: VehicleState
    ): VehicleState {
        return {
            ...vehicleState,
            position: this.getPosition(vehicleState.direction, vehicleState.position)
        }
    }

    public getPosition(
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