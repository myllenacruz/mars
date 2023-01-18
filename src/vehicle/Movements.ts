
import { VehicleState, Directions } from "@vehicle/types";
import { Turn } from "@vehicle/Turn";
import { Move } from "@vehicle/Move";

export class Movements {
    public execute(
        command: string, 
        state: VehicleState
    ): VehicleState {
        let newState: VehicleState = state;

        for (const cmd of command.split("")) 
            newState = this.applyCommand(cmd, newState);

        return newState;
    }
    
    private applyCommand(
        command: string,
        state: VehicleState,
    ): VehicleState {
        const turn = new Turn();
        const move = new Move();
        let direction: Directions = "" as Directions;

        if (command === "E") direction = turn.left(state.direction);
        if (command === "D") direction = turn.right(state.direction);
        if (command === "M") return move.execute(state);

        return { ...state, direction };
    }
}
