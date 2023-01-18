import { VehicleState, Directions, Coordinates } from "@vehicle/types";

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
        let direction: Directions = "" as Directions;

        if (command === "E") direction = this.left(state.direction);
        if (command === "D") direction = this.right(state.direction);
        if (command === "M") return this.move(state);

        return { ...state, direction };
    }

    public left(direction: Directions): Directions {
        switch(direction) {
            case "N":
                return "O";
    
            case "O":
                return "S";
    
            case "S":
                return "L";
    
            case "L":
                return "N";
        };
    }

    public right(direction: Directions): Directions {
        switch(direction) {
            case "N":
                return "L";
    
            case "L":
                return "S";
    
            case "S":
                return "O";
    
            case "O":
                return "N";
        }
    }

    public move(
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

        switch(direction) {
            case "N":
                return [x, y + 1]
            
            case "L":
                return [x + 1, y]
            
            case "S":
                return [x, y - 1]
            
            case "O":
                return [x - 1, y]
        }
    };
}
