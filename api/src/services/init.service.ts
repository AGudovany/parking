import {Injectable, OnModuleInit} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ParkingSpace} from '../entities/parking-space.entity';
import {building} from "../configuration/building";
import {UtilityService} from "./utility.service";

@Injectable()
export class InitService implements OnModuleInit {
    constructor(
        @InjectRepository(ParkingSpace)
        private readonly parkingSpaceRepository: Repository<ParkingSpace>,

        private readonly utilityService: UtilityService
    ) {
    }

    onModuleInit() {
        this.prepareParkingSpaces();
    }

    async prepareParkingSpaces() {
        const count = await this.parkingSpaceRepository.count();
        if (count > 0) {
            console.log('Parking spaces already existing');
            return;
        }

        const data = [];
        const { floors} = building;

        for (let f = 0; f < floors.length; f += 1) {
            const spaces = Object.keys(floors[f]);
            spaces.forEach((spaceName) => {
                const floor = f + 1;
                const space = floors[f][spaceName];
                const hourlyRate = space.hourlyRate;
                const spaceType = this.utilityService.getSpaceType(spaceName);

                for (let i = space.start; i <= space.end; i++) {
                    data.push({
                        id: i,
                        floor,
                        isOccupied: false,
                        spaceType,
                        hourlyRate,
                    });
                }
            })
        }
        await this.parkingSpaceRepository.save(data);
    }
}
