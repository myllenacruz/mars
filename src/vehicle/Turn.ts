import { Directions } from "./types/Directions";

export class Turn {
    public left(direction: Directions): Directions {
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

    public right(direction: Directions): Directions {
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
}