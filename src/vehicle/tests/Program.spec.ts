import { Movements } from "@vehicle/Movements";
import { Program } from "@vehicle/Program";
import { VehicleState, Directions, Coordinates } from "@vehicle/types";

const movements: Movements = new Movements();
const program: Program = new Program();

function vehicleState(
    direction: Directions, 
    position?: Coordinates
): VehicleState {
    const startPosition: Coordinates = [1, 1];

    return {
        direction: direction,
        position: position || startPosition
    }
};

test.each
`
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
("When facing $forward, turning $direction should cause to face $expected", 
	({ forward, expected , direction }) => {
		expect(
			movements.execute(direction, vehicleState(forward))
		).toEqual(vehicleState(expected));
   	}
);

test("When moving N should increment the Y coordinate", () => {
    expect(
        movements.execute("M", vehicleState("N"))
    ).toEqual(vehicleState("N", [1, 2]));
});

test("When moving O should decrement the X coordinate", () => {
    expect(
        movements.execute("M", vehicleState("O"))
    ).toEqual(vehicleState("O", [0, 1]));
});

test("When moving S should decrement the Y coordinate", () => {
    expect(
        movements.execute("M", vehicleState("S"))
    ).toEqual(vehicleState("S", [1, 0]));
});

test("When moving L should increment the X coordinate", () => {
    expect(
        movements.execute("M", vehicleState("L"))
    ).toEqual(vehicleState("L", [2, 1]));
});

test("Executing multiple commands", () => {
    expect(
        movements.execute("EMEMEMEMM", vehicleState("N", [1, 2]))
    ).toEqual(vehicleState("N", [1, 3]));
    
    expect(
        movements.execute("MMDMMDMDDM", vehicleState("L", [3, 3]))
    ).toEqual(vehicleState("L", [5, 1]));
});

test("Executing program inputs", () => {
    const inputs = [
        "5 5", 
        "1 2 N", 
        "EMEMEMEMM", 
        "3 3 L", 
        "MMDMMDMDDM"
    ];

    expect(program.run(inputs)).toEqual([
        "1 3 N", 
        "5 1 L"
    ]);
});