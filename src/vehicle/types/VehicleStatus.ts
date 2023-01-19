import { VehicleState } from "@vehicle/types";

export type VehicleStatus = 
    | VehicleState & { status: "Success" }
    | VehicleState & { status?: "Failure" };