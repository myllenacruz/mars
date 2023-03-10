import { VehicleState, Directions, Coordinates, VehicleStatus } from "@vehicle/types";

export class Vehicle {
    public execute(
        command: string, 
        state: VehicleStatus,
        maxGridPosition: Coordinates
    ): VehicleStatus {
        let newState = state;

        for (const cmd of command.split(""))
            newState = this.applyCommand(cmd, newState, maxGridPosition);

        return newState;
    }
    
    private applyCommand(
        command: string,
        state: VehicleState,
        maxGridPosition: Coordinates
    ): VehicleState {
        let direction = state.direction;

        if (command === "E") direction = this.left(direction);
        if (command === "D") direction = this.right(direction);
        if (command === "M") return this.move(state, maxGridPosition);

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
        vehicleState: VehicleState,
        maxPosition: Coordinates
    ): VehicleStatus {
        const nextPosition = this.getPosition(vehicleState.direction, vehicleState.position);

        if (this.isOutOfGrid(nextPosition, maxPosition)) 
            return {
                ...vehicleState,
                status: "Failure"
            }

        return {
            ...vehicleState,
            position: this.getPosition(vehicleState.direction, vehicleState.position),
            status: "Success"
        }
    }

    public isOutOfGrid(
        nextPosition: Coordinates, 
        maxPosition: Coordinates
    ): boolean {
        if (
            nextPosition[0] < 0 || 
            nextPosition[1] < 0 || 
            nextPosition[0] > maxPosition[0] ||
            nextPosition[1] > maxPosition[1]
        ) return true;

        return false;
    }

    public getPosition(
        direction: Directions,
        position: Coordinates
    ): Coordinates {
        const [x, y] = position;

        switch(direction) {
            case "N":
                return [x, y + 1];
            
            case "L":
                return [x + 1, y];
            
            case "S":
                return [x, y - 1];
            
            case "O":
                return [x - 1, y];
        }
    };
    
    public initalState(location: string): VehicleState {
        const [x, y, direction] = location.split(" ");
    
        return { 
            direction: direction as Directions, 
            position: [parseInt(x), parseInt(y)]
        };
    }
}