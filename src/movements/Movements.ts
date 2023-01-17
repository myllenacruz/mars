
import { VehicleMovements } from "../movements/types/VehicleMovements";
import { Turn } from "./Turn";
import { Move } from "./Move";

export class Movements {
    private applyCommand(
        state: VehicleMovements,
        command: string
    ): VehicleMovements {
        const turn = new Turn();
        const move = new Move();

        if (command === "E")
            return {
                ...state,
                direction: turn.left(state.direction)
            };
    
        if (command === "D")
            return {
                ...state,
                direction: turn.right(state.direction)
            };
    
        if (command === "M") return move.execute(state)

        return state;
    }

    public execute(
        command: string, 
        state: VehicleMovements
    ): VehicleMovements {
        const movements = command.split("").reduce(this.applyCommand, state);
        return movements;
    }
}
