const turnLeft = (direction: string): string | undefined => {
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

const turnRight = (direction: string): string | undefined => {
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
});