import { VehicleMovements } from "./types/VehicleMovements";
import { Directions } from "./types/Directions";
import { Coordinates } from "./types/Coordinates";
import { Movements } from "./Movements";

export class Execution {
    public vehicleMovements(
        direction: string, 
        position?: Coordinates
    ): VehicleMovements {
        const startPosition: Coordinates = [1, 1];

        return {
            direction: direction as Directions,
            position: position || startPosition
        }
    };

    public initalState(location: string, position?: Coordinates): VehicleMovements {
        const [x, y, direction] = location.split(" ");
    
        return { 
            direction: direction as Directions, 
            position: position || [parseInt(x), parseInt(y)] 
        };
    }
    
    public output(state: VehicleMovements): string {
        return `${state.position[0]} ${state.position[1]} ${state.direction}`
    }
    
    public run(input: string[]): string[] {
        const outputs: string[] = [];
        let state: VehicleMovements;
        
        input.shift();
    
        while(input.length > 0) {
            const movements = new Movements();
            const [inputLocation, command] = [input.shift(), input.shift()];
    
            if (command && inputLocation) {
                state = movements.execute(command, this.initalState(inputLocation));
                
                outputs.push(this.output(state));
            }
        }
        
        return outputs;
    }
}