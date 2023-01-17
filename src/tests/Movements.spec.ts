import { Movements } from "../movements/Movements";
import { Execution } from "../movements/Execution";

const movements: Movements = new Movements();
const execution: Execution = new Execution();

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
                movements.execute(direction, execution.vehicleMovements(forward))
            ).toEqual(execution.vehicleMovements(expected));
        });

    test("When moving N should increment the Y coordinate", () => {
        expect(
            movements.execute("M", execution.vehicleMovements("N"))
        ).toEqual(execution.vehicleMovements("N", [1, 2]));
    });

    test("When moving O should decrement the X coordinate", () => {
        expect(
            movements.execute("M", execution.vehicleMovements("O"))
        ).toEqual(execution.vehicleMovements("O", [0, 1]));
    });

    test("When moving S should decrement the Y coordinate", () => {
        expect(
            movements.execute("M", execution.vehicleMovements("S"))
        ).toEqual(execution.vehicleMovements("S", [1, 0]));
    });

    test("When moving L should increment the X coordinate", () => {
        expect(
            movements.execute("M", execution.vehicleMovements("L"))
        ).toEqual(execution.vehicleMovements("L", [2, 1]));
    });

    test("Executing multiple commands", () => {
        expect(
            movements.execute("EMEMEMEMM", execution.vehicleMovements("N", [1, 2]))
        ).toEqual(execution.vehicleMovements("N", [1, 3]))
        
        expect(
            movements.execute("MMDMMDMDDM", execution.vehicleMovements("L", [3, 3]))
        ).toEqual(execution.vehicleMovements("L", [5, 1]))
    });

    test("Executing program inputs", () => {
        const inputs = [
            "5 5", 
            "1 2 N", 
            "EMEMEMEMM", 
            "3 3 L", 
            "MMDMMDMDDM"
        ];

        expect(execution.run(inputs)).toEqual([
            "1 3 N", 
            "5 1 L"
        ]);
    });
});