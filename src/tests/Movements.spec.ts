import { VehicleMovements } from "../movements/types/VehicleMovements";
import { Movements } from "../movements/Movements";
import { Coordinates } from "../movements/types/Coordinates";
import { Directions } from "../movements/types/Directions";

const movements: Movements = new Movements();
const startPosition: Coordinates = [1, 1];

function vehicleMovements(
    direction: string, 
    position?: Coordinates
): VehicleMovements {
    return {
        direction: direction as Directions,
        position: position || startPosition
    }
};

function initalState(location: string): VehicleMovements {
    const [x, y, direction] = location.split(" ");

    return vehicleMovements(direction, [parseInt(x), parseInt(y)]);
}

function output(state: VehicleMovements): string {
    return `${state.position[0]} ${state.position[1]} ${state.direction}`
}

function run(input: string[]): string[] {
    const outputs = [];
    let state: VehicleMovements;
    
    input.shift();

    while(input.length > 0) {
        const [inputLocation, command] = [input.shift(), input.shift()];

        if (command && inputLocation) {
            state = movements.execute(command, initalState(inputLocation));
            
            outputs.push(output(state));
        }
    }
    
    return outputs;
}

describe("Possible Movements", () => {
    test.each`
        forward   | direction | expected
        ${"N"}    |  ${"E"}   |  ${"O"}
        ${"O"}    |  ${"E"}   |  ${"S"}
        ${"S"}    |  ${"E"}   |  ${"L"}
        ${"L"}    |  ${"E"}   |  ${"N"}
        ${"N"}    |  ${"D"}   |  ${"L"}
        ${"S"}    |  ${"D"}   |  ${"O"}
        ${"L"}    |  ${"D"}   |  ${"S"} 
        ${"O"}    |  ${"D"}   |  ${"N"} 
        `
        ("When facing $forward, turning $direction should cause to face $expected", ({ forward, expected , direction }) => {
            expect(
                movements.execute(direction, vehicleMovements(forward))
            ).toEqual(vehicleMovements(expected));
        });

    test("When moving N should increment the Y coordinate", () => {
        expect(
            movements.execute("M", vehicleMovements("N"))
        ).toEqual(vehicleMovements("N", [1, 2]));
    });

    test("When moving O should decrement the X coordinate", () => {
        expect(
            movements.execute("M", vehicleMovements("O"))
        ).toEqual(vehicleMovements("O", [0, 1]));
    });

    test("When moving S should decrement the Y coordinate", () => {
        expect(
            movements.execute("M", vehicleMovements("S"))
        ).toEqual(vehicleMovements("S", [1, 0]));
    });

    test("When moving L should increment the X coordinate", () => {
        expect(
            movements.execute("M", vehicleMovements("L"))
        ).toEqual(vehicleMovements("L", [2, 1]));
    });

    test("When executing multiple commands", () => {
        expect(
            movements.execute("EMEMEMEMM", vehicleMovements("N", [1, 2]))
        ).toEqual(vehicleMovements("N", [1, 3]))
        
        expect(
            movements.execute("MMDMMDMDDM", vehicleMovements("L", [3, 3]))
        ).toEqual(vehicleMovements("L", [5, 1]))
    });

    test("When executing program inputs", () => {
        const input = ["5 5 5", "1 2 N", "EMEMEMEMM", "3 3 L", "MMDMMDMDDM"];

        expect(run(input)).toEqual(["1 3 N", "5 1 L"]);
    });
});