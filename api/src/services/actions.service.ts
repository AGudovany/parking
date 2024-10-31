import {Injectable, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {IsNull, Repository} from 'typeorm';
import {ParkingSpace} from '../entities/parking-space.entity';
import {ParkingSession} from '../entities/parking-session.entity';
import {CheckInType, ParkingSpaceType} from "../common/types";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(ParkingSpace)
        private readonly parkingSpaceRepo: Repository<ParkingSpace>,
        @InjectRepository(ParkingSession)
        private readonly parkingSessionRepo: Repository<ParkingSession>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {
    }

    async checkIn (query: object): Promise<CheckInType> {
        const availableSpace = await this.parkingSpaceRepo.findOne({
            where: {...query},
            order: {id: "ASC"}
        });

        if (!availableSpace) {
            throw new Error('No available parking space');
        }

        availableSpace.isOccupied = true;
        await this.parkingSpaceRepo.save(availableSpace);

        const session = new ParkingSession();
        session.parkingSpaceId = availableSpace.id;

        const savedSession = await this.parkingSessionRepo.save(session);

        await this.cacheManager.del('occupation');
        await this.cacheManager.del('generalInfo');

        return {
            parkingSessionId: savedSession.id,
            parkingSpaceId: availableSpace.id,
        };
    }

    async checkInBySpace(parkingSpaceId: number): Promise<CheckInType> {
        const query = {
                id: parkingSpaceId,
                isOccupied: false,
        }
        return await this.checkIn(query);
    }

    async checkInFirstByType(spaceType: ParkingSpaceType): Promise<CheckInType> {
        const query = {
                spaceType,
                isOccupied: false,
            }
        return await this.checkIn(query);
    }

    async checkOut(parkingSpaceId: number) {
        const session = await this.parkingSessionRepo.findOne({
                where: {
                    parkingSpaceId: parkingSpaceId,
                    endTime: IsNull(),
                }
            }
        );
        if (!session) throw new Error('Session not found');

        session.endTime = new Date();
        await this.parkingSessionRepo.save(session);
        const parkingSpace = await this.parkingSpaceRepo.findOne({
            where: {
                id: session.parkingSpaceId
            }
        });
        parkingSpace.isOccupied = false;
        await this.parkingSpaceRepo.save(parkingSpace);

        const duration = (session.endTime.getTime() - new Date(session.startTime).getTime()) / 1000 / 60;
        const sessionLengthInMinutes = Math.round(duration * 100) / 100;
        const sessionCost = sessionLengthInMinutes * (parkingSpace.hourlyRate / 60);

        await this.cacheManager.del('occupation');
        await this.cacheManager.del('generalInfo');

        return {
            parkingSpaceId: session.parkingSpaceId,
            sessionLengthInMinutes,
            sessionCost: Math.round(sessionCost * 100) / 100
        };
    }
}
