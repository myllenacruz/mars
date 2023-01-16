import { Coordinates } from "../movements/types/Coordinates";
import { Directions } from "../movements/types/Directions";
import { VehicleMovements } from "../movements/types/VehicleMovements";

function turnLeft(direction: Directions): Directions {
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

function turnRight(direction: Directions): Directions {
    switch(direction) {
        case "N":
            return "L";

        case "L":
            return "S";

        case "S":
            return "O";

        case "O":
            return "N";
    };
}

function move(
    direction: Directions, 
    position: Coordinates
): Coordinates {
    const [x, y] = position;

    if (direction === "N") return [x, y + 1];
    if (direction === "L") return [x + 1, y];
    if (direction === "S") return [x, y - 1];
    if (direction === "O") return [x - 1, y];

    return position;
}

function execute(
    command: string, 
    initialState: VehicleMovements
): VehicleMovements | undefined {
    if (command === "E")
        return {
            ...initialState,
            direction: turnLeft(initialState.direction)
        };

    if (command === "D")
        return {
            ...initialState,
            direction: turnRight(initialState.direction)
        };

    if (command === "M")
        return {
            ...initialState,
            position: move(initialState.direction, initialState.position)
        };
}

describe("Possible Movements", () => {
    test.each`
        forward   | expected
        ${"N"}    | ${"O"}
        ${"O"}    | ${"S"}
        ${"S"}    | ${"L"} 
        ${"L"}    | ${"N"} 
        `
        ("When facing $forward, turning left should cause to face $expected", ({ forward, expected }) => {  
            const initialState: VehicleMovements = {
                direction: forward,
                position: [1, 1]
            };

            expect(execute("E", initialState)).toEqual({
                ...initialState,
                direction: expected
            });
        });
    
    test.each`
        forward   | expected
        ${"N"}    | ${"L"}
        ${"S"}    | ${"O"}
        ${"L"}    | ${"S"} 
        ${"O"}    | ${"N"} 
        `
        ("When facing $forward, turning right should cause to face $expected", ({ forward, expected }) => {
            const initialState: VehicleMovements = {
                direction: forward,
                position: [1, 1]
            };

            expect(execute("D", initialState)).toEqual({
                ...initialState,
                direction: expected
            });
        });

    test("When moving N should increment the Y coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "N",
            position: [1, 1]
        };

        expect(execute("M", initialState)).toEqual({
            ...initialState,
            position: [1, 2]
        });
    });

    test("When moving O should increment the X coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "O",
            position: [1, 1]
        };
        

        expect(execute("M", initialState)).toEqual({
            ...initialState,
            position: [0, 1]
        });
    });

    test("When moving S should decrement the Y coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "S",
            position: [1, 1]
        };

        expect(execute("M", initialState)).toEqual({
            ...initialState,
            position: [1, 0]
        });
    });

    test("When moving L should increment the X coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "L",
            position: [1, 1]
        };

        expect(execute("M", initialState)).toEqual({
            ...initialState,
            position: [2, 1]
        });
    });
});