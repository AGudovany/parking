export type ParkingSpaceType = 'CAR' | 'MOTOR' | 'RESIDENT';

export type ParkingSpace = {
    parkingSpaceId: number;
    floor: number;
    spaceType: ParkingSpaceType;
    isOccupied: boolean;
    hourlyRate: number;
};

export type CheckInType = {
    "parkingSessionId": string,
    "parkingSpaceId": number
}

export type CheckOutType = {
    parkingSpaceId: number
    sessionCost: number
    sessionLengthInMinutes: number
}