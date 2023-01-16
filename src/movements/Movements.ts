
import { VehicleMovements } from "../movements/types/VehicleMovements";
import { Turn } from "./Turn";
import { Move } from "./Move";
import { Command } from "./types/Command";

export class Movements {
    public execute(
        command: Command, 
        initialState: VehicleMovements
    ): VehicleMovements | undefined {
        const turn = new Turn();
        const move = new Move();

        if (command === "E")
            return {
                ...initialState,
                direction: turn.left(initialState.direction)
            };
    
        if (command === "D")
            return {
                ...initialState,
                direction: turn.right(initialState.direction)
            };
    
        if (command === "M")
            return {
                ...initialState,
                position: move.execute(initialState.direction, initialState.position)
            };
    };
}
