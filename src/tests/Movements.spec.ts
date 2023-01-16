import { Coordinates } from "../movements/types/Coordinates";
import { Directions } from "../movements/types/Directions";

const turnLeft = (direction: Directions): string | undefined => {
    switch(direction) {
        case "N":
            return "O";

        case "O":
            return "S";

        case "S":
            return "L";

        case "L":
           return "N";
    }
}

const turnRight = (direction: Directions): string | undefined => {
    switch(direction) {
        case "N":
            return "L";

        case "L":
            return "S";

        case "S":
            return "O";

        case "O":
            return "N";
    }
}

const move = (
    direction: Directions, 
    position: Coordinates
): number[] | undefined => {
    const [x, y] = position;

    if (direction === "N") return [x, y + 1];
    if (direction === "L") return [x + 1, y];
    if (direction === "S") return [x, y - 1];
    if (direction === "O") return [x - 1, y];
}

describe("Possible Movements", () => {
    test.each`
        direction | expected
        ${"N"}    | ${"O"}
        ${"O"}    | ${"S"}
        ${"S"}    | ${"L"} 
        ${"L"}    | ${"N"} 
        `
        ("When facing $direction, turning left should cause to face $expected", ({ direction, expected }) => {  
            expect(turnLeft(direction)).toBe(expected); 
        });
    
    test.each`
        direction | expected
        ${"N"}    | ${"L"}
        ${"S"}    | ${"O"}
        ${"L"}    | ${"S"} 
        ${"O"}    | ${"N"} 
        `
        ("When facing $direction, turning right should cause to face $expected", ({ direction, expected }) => {
            expect(turnRight(direction)).toBe(expected);
        });

    test("When moving N should increment the Y coordinate", () => {
        expect(move("N", [1, 1])).toEqual([1, 2]);
    });

    test("When moving O should increment the X coordinate", () => {
        expect(move("O", [1, 1])).toEqual([0, 1]);
    });

    test("When moving S should decrement the Y coordinate", () => {
        expect(move("S", [1, 1])).toEqual([1, 0]);
    });

    test("When moving L should increment the X coordinate", () => {
        expect(move("L", [1, 1])).toEqual([2, 1]);
    });
});