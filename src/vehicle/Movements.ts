
import { VehicleMovements } from "../vehicle/types/VehicleMovements";
import { Turn } from "./Turn";
import { Move } from "./Move";
import { Directions } from "./types/Directions";

export class Movements {
    public execute(
        command: string, 
        state: VehicleMovements
    ): VehicleMovements {
        const movements = command.split("").reduce(this.applyCommand, state);
        return movements;
    }
    
    private applyCommand(
        state: VehicleMovements,
        command: string
    ): VehicleMovements {
        const turn = new Turn();
        const move = new Move();
        let direction: Directions = "" as Directions;

        if (command === "E") direction = turn.left(state.direction);
        if (command === "D") direction = turn.right(state.direction);
        if (command === "M") return move.execute(state);

        return { ...state, direction };
    }
}
