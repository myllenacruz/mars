import { Vehicle } from "@vehicle/Vehicle";
import { VehicleStatus } from "@vehicle/types";

export class Program {
    public run(inputs: string[]): string[] {
        const outputs: string[] = [];
        const [maxX, maxY] = inputs.shift()!.split(" ");
    
        while(inputs.length > 0) {
            const vehicle = new Vehicle();
            const [inputLocation, command] = [inputs.shift()!, inputs.shift()!];

            const state = vehicle.execute(
                command, 
                vehicle.initalState(inputLocation), 
                [parseInt(maxX), parseInt(maxY)]
            );
                
            outputs.push(this.output(state));
        }
        
        return outputs;
    }
    
    private output(state: VehicleStatus): string {
        const location = `${state.position[0]} ${state.position[1]} ${state.direction}`;
        
        return state.status === "Success" ? location : `F ${location}`;
    }
}