import { VehicleMovements } from "../movements/types/VehicleMovements";
import { Movements } from "../movements/Movements";

const movements = new Movements();

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

            expect(movements.execute("E", initialState)).toEqual({
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

            expect(movements.execute("D", initialState)).toEqual({
                ...initialState,
                direction: expected
            });
        });

    test("When moving N should increment the Y coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "N",
            position: [1, 1]
        };

        expect(movements.execute("M", initialState)).toEqual({
            ...initialState,
            position: [1, 2]
        });
    });

    test("When moving O should increment the X coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "O",
            position: [1, 1]
        };
        

        expect(movements.execute("M", initialState)).toEqual({
            ...initialState,
            position: [0, 1]
        });
    });

    test("When moving S should decrement the Y coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "S",
            position: [1, 1]
        };

        expect(movements.execute("M", initialState)).toEqual({
            ...initialState,
            position: [1, 0]
        });
    });

    test("When moving L should increment the X coordinate", () => {
        const initialState: VehicleMovements = {
            direction: "L",
            position: [1, 1]
        };

        expect(movements.execute("M", initialState)).toEqual({
            ...initialState,
            position: [2, 1]
        });
    });
});