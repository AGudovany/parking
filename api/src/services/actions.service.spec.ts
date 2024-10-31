import { Test, TestingModule } from '@nestjs/testing';
import { ActionsService } from './actions.service';
import { ParkingSpace } from '../entities/parking-space.entity';
import { ParkingSession } from '../entities/parking-session.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

describe('ActionsService', () => {
    let service: ActionsService;
    let parkingSpaceRepo: Partial<Repository<ParkingSpace>>;
    let parkingSessionRepo: Partial<Repository<ParkingSession>>;
    let cacheManager: Partial<Cache>;

    beforeEach(async () => {
        parkingSpaceRepo = {
            findOne: jest.fn(),
            save: jest.fn(),
        };
        parkingSessionRepo = {
            findOne: jest.fn(),
            save: jest.fn(),
        };
        cacheManager = {
            del: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ActionsService,
                { provide: getRepositoryToken(ParkingSpace), useValue: parkingSpaceRepo },
                { provide: getRepositoryToken(ParkingSession), useValue: parkingSessionRepo },
                { provide: 'CACHE_MANAGER', useValue: cacheManager },
            ],
        }).compile();

        service = module.get<ActionsService>(ActionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('checkInFirstByType', () => {
        it('should call checkIn with correct query for spaceType', async () => {
            const mockResponse = { parkingSessionId: '123', parkingSpaceId: 1 };
            jest.spyOn(service, 'checkIn').mockResolvedValue(mockResponse);

            const result = await service.checkInFirstByType('CAR');
            expect(result).toEqual(mockResponse);
            expect(service.checkIn).toHaveBeenCalledWith({ spaceType: 'CAR', isOccupied: false });
        });
    });

    describe('checkOut', () => {
        it('should throw error if session is not found', async () => {
            (parkingSessionRepo.findOne as jest.Mock).mockResolvedValue(null);

            await expect(service.checkOut(1)).rejects.toThrow('Session not found');
        });

        it('should update session, parking space, and clear cache on checkout', async () => {
            const mockSession = { id: 1, parkingSpaceId: 1, startTime: new Date(), endTime: null };
            const mockSpace = { id: 1, isOccupied: true, hourlyRate: 5 };
            (parkingSessionRepo.findOne as jest.Mock).mockResolvedValue(mockSession);
            (parkingSpaceRepo.findOne as jest.Mock).mockResolvedValue(mockSpace);
            (parkingSessionRepo.save as jest.Mock).mockResolvedValue({ ...mockSession, endTime: new Date() });
            (parkingSpaceRepo.save as jest.Mock).mockResolvedValue({ ...mockSpace, isOccupied: false });

            const result = await service.checkOut(1);

            expect(result).toHaveProperty('parkingSpaceId', 1);
            expect(cacheManager.del).toHaveBeenCalledWith('occupation');
            expect(cacheManager.del).toHaveBeenCalledWith('generalInfo');
        });
    });
});
