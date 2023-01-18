
import { VehicleMovements } from "../vehicle/types/VehicleMovements";
import { Turn } from "./Turn";
import { Move } from "./Move";
import { Directions } from "./types/Directions";

export class Movements {
    public execute(
        command: string, 
        state: VehicleMovements
    ): VehicleMovements {
        let result: VehicleMovements = state;

        for (const cmd of command.split("")) 
            result = this.applyCommand(cmd, result);

        return result;
    }
    
    private applyCommand(
        command: string,
        state: VehicleMovements,
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
