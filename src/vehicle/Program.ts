import { Movements } from "./Movements";
import { VehicleMovements } from "./types/VehicleMovements";
import { Vehicle } from "./Vehicle";

export class Program {
    public run(inputs: string[]): string[] {
        const outputs: string[] = [];
        let state: VehicleMovements;
        
        inputs.shift();
    
        while(inputs.length > 0) {
            const movements = new Movements();
            const vehicle = new Vehicle();

            const [inputLocation, command] = [inputs.shift(), inputs.shift()];
    
            if (command && inputLocation) {
                state = movements.execute(command, vehicle.initalState(inputLocation));
                
                outputs.push(this.output(state));
            }
        }
        
        return outputs;
    }
    
    private output(state: VehicleMovements): string {
        return `${state.position[0]} ${state.position[1]} ${state.direction}`;
    }
}