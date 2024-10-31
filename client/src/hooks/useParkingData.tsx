import {useEffect, useMemo, useState} from "react";
import {getOccupation, ParkingSpace, ParkingSpaceType, setCheckIn, setCheckOut} from "../services/apiService.tsx";
import {applyFilters} from "../services/filtersService.ts";

export const useParkingData = (
    spaceType?: ParkingSpaceType,
    occupation?: boolean,
) => {
    const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([]);

    const filteredSpaces = useMemo(() => {
        return applyFilters(parkingSpaces, {
            spaceType,
            occupation
        })
    }, [spaceType, occupation, parkingSpaces]);

    const checkInOutHandler = async (id: number, isOccupied: boolean) => {
        let response;

        if (isOccupied) {
            response = await setCheckOut(id)
        } else {
            response = await setCheckIn(id);
        }
        if (response) {
            getOccupation().then((data: ParkingSpace[]) => {
                setParkingSpaces(data);
            });
        }
    }

    useEffect(() => {
        getOccupation().then((data: ParkingSpace[]) => {
            setParkingSpaces(data);
        });
    }, []);

    return {
        filteredSpaces,
        checkInOutHandler
    };
};
