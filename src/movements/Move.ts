import { Coordinates } from "./types/Coordinates";
import { VehicleMovements } from "./types/VehicleMovements";

export class Move {
    public execute(
        vehicleMovements: VehicleMovements
    ): Coordinates {
        const [x, y] = vehicleMovements.position;
    
        if (vehicleMovements.direction === "N") return [x, y + 1];
        if (vehicleMovements.direction === "L") return [x + 1, y];
        if (vehicleMovements.direction === "S") return [x, y - 1];
        if (vehicleMovements.direction === "O") return [x - 1, y];
    
        return vehicleMovements.position;
    };
}