import { Vehicle } from "@vehicle/Vehicle";
import { Program } from "@vehicle/Program";
import { Directions, Coordinates, VehicleStatus } from "@vehicle/types";

const vehicle: Vehicle = new Vehicle();
const program: Program = new Program();
const maxGridPosition: Coordinates = [5, 5];

function vehicleState(
    direction: Directions, 
    position?: Coordinates
): VehicleStatus {
    const startPosition: Coordinates = [1, 1];

    return {
        direction: direction,
        position: position || startPosition,
        status: "Success"
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
			vehicle.execute(direction, vehicleState(forward), maxGridPosition)
		).toEqual(vehicleState(expected));
   	}
);

test("When moving N should increment the Y coordinate", () => {
    expect(
        vehicle.execute("M", vehicleState("N"), maxGridPosition)
    ).toEqual(vehicleState("N", [1, 2]));
});

test("When moving O should decrement the X coordinate", () => {
    expect(
        vehicle.execute("M", vehicleState("O"), maxGridPosition)
    ).toEqual(vehicleState("O", [0, 1]));
});

test("When moving S should decrement the Y coordinate", () => {
    expect(
        vehicle.execute("M", vehicleState("S"), maxGridPosition)
    ).toEqual(vehicleState("S", [1, 0]));
});

test("When moving L should increment the X coordinate", () => {
    expect(
        vehicle.execute("M", vehicleState("L"), maxGridPosition)
    ).toEqual(vehicleState("L", [2, 1]));
});

test("Executing multiple commands", () => {
    expect(
        vehicle.execute("EMEMEMEMM", vehicleState("N", [1, 2]), maxGridPosition)
    ).toEqual(vehicleState("N", [1, 3]));
    
    expect(
        vehicle.execute("MMDMMDMDDM", vehicleState("L", [3, 3]), maxGridPosition)
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

test.each`
    direction                 |  expected
    ${["0 0", "0 0 O", "M"]}  |  ${["F 0 0 O"]}
    ${["0 0", "0 0 S", "M"]}  |  ${["F 0 0 S"]}
    ${["0 0", "0 0 N", "M"]}  |  ${["F 0 0 N"]}
    ${["0 0", "0 0 L", "M"]}  |  ${["F 0 0 L"]}
`
("When moving $direction off the edge of the grid, should return $expected as failure with last position", 
    ({ direction, expected }) => {
        expect(program.run(direction)).toEqual(expected);
    }
);
