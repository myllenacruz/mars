import { VehicleMovements } from "../movements/types/VehicleMovements";
import { Movements } from "../movements/Movements";
import { Directions } from "../movements/types/Directions";
import { Coordinates } from "../movements/types/Coordinates";

const movements: Movements = new Movements();
const startPosition: Coordinates = [1, 1];

function vehicleMovements(
    direction: any, 
    position?: Coordinates
): VehicleMovements {
    return {
        direction,
        position: position || startPosition
    }
};

function run(input: string[]): VehicleMovements {
    const [inputLocation] = input;
    const [x, y, direction] = inputLocation.split(" ");

    return vehicleMovements(direction, [parseInt(x), parseInt(y)]);
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
    });

    test("When executing program inputs", () => {
        const inputLocation = ["1 2 N"];

        expect(run(inputLocation)).toEqual(vehicleMovements("N", [1, 2]));
    });
});