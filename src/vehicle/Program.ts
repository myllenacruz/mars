import { Movements } from "@vehicle/Movements";
import { Vehicle } from "@vehicle/Vehicle";
import { VehicleState } from "@vehicle/types";

export class Program {
    public run(inputs: string[]): string[] {
        const outputs: string[] = [];
        let state: VehicleState;
        
        inputs.shift();
    
        while(inputs.length > 0) {
            const movements = new Movements();
            const vehicle = new Vehicle();

            const [inputLocation, command] = [inputs.shift()!, inputs.shift()!];
    
            state = movements.execute(command, vehicle.initalState(inputLocation));
                
            outputs.push(this.output(state));
        }
        
        return outputs;
    }
    
    private output(state: VehicleState): string {
        return `${state.position[0]} ${state.position[1]} ${state.direction}`;
    }
}