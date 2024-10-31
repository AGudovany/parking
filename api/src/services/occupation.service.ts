import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ParkingSpace} from '../entities/parking-space.entity';
import {UtilityService} from "./utility.service";

@Injectable()
export class OccupationService {
    constructor(
        @InjectRepository(ParkingSpace)
        private readonly parkingSpaceRepo: Repository<ParkingSpace>,
        private readonly utilityService: UtilityService,
    ) {
    }

    async getOccupationStatus() {
        const spaces = await this.parkingSpaceRepo.find({order: {id: "ASC"}});

        return spaces.map(space => ({
            parkingSpaceId: space.id,
            floor: space.floor,
            spaceType: this.utilityService.getSpaceName(space.spaceType),
            isOccupied: space.isOccupied,
        }));
    }

    async getOccupationGeneralInfo() {
        return await this.parkingSpaceRepo.createQueryBuilder('parking_space')
            .select('parking_space.floor', 'floor')
            .addSelect('parking_space.spaceType', 'type')
            .addSelect('parking_space.isOccupied', 'isOccupied')
            .addSelect('COUNT(parking_space.id)', 'count')
            .groupBy('parking_space.floor')
            .addGroupBy('parking_space.spaceType')
            .addGroupBy('parking_space.isOccupied')
            .orderBy("parking_space.floor", "ASC")
            .addOrderBy("parking_space.isOccupied", "ASC")
            .getRawMany();
    }
}
