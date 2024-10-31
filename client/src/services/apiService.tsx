const baseURL = "http://localhost:4000";

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

export const getOccupation = async (): Promise<ParkingSpace[]> => {
    const url = `${baseURL}/occupation`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to get parking occupation");
    }
    return response.json();
};

export const setCheckIn = async (parkingSpaceId: number): Promise<CheckInType> => {
    const url = `${baseURL}/check-in/spaces`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({parkingSpaceId: parkingSpaceId})
    });
    if (!response.ok) {
        throw new Error("Failed to check-in");
    }
    return response.json();
};

export const setCheckOut = async (id: number): Promise<CheckOutType> => {
    const url = `${baseURL}/check-out`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({parkingSpaceId: id})
    });
    if (!response.ok) {
        throw new Error("Failed to check-out");
    }
    return response.json();
};
