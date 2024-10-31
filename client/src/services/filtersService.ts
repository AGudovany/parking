import {ParkingSpace, ParkingSpaceType} from "./apiService.tsx";

interface FilterOption {
    spaceType: ParkingSpaceType | undefined;
    occupation: boolean | undefined;
}

const filterByType = (spaceType: ParkingSpaceType, spaces: ParkingSpace[]) => {
    return spaces.filter((space) => space.spaceType === spaceType)
}

const filterByOccupation = (occupation: boolean, spaces: ParkingSpace[]) => {
    return spaces.filter((space) => space.isOccupied === occupation)
}

export const applyFilters = (spaces: ParkingSpace[], options: FilterOption) => {
    const {spaceType, occupation} = options;
    let filteredSpaces = spaces;
    if (spaceType) {
        filteredSpaces = filterByType(spaceType, filteredSpaces);
    }
    if (occupation !== undefined) {
        filteredSpaces = filterByOccupation(occupation, filteredSpaces);
    }
    return filteredSpaces
}