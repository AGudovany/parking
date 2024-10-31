import { Test, TestingModule } from '@nestjs/testing';
import { ActionsController } from './actions.controller';
import { ActionsService } from '../services/actions.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ActionsController', () => {
    let controller: ActionsController;
    let actionsService: Partial<ActionsService>;

    beforeEach(async () => {
        actionsService = {
            checkInFirstByType: jest.fn(),
            checkInBySpace: jest.fn(),
            checkOut: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ActionsController],
            providers: [
                {
                    provide: ActionsService,
                    useValue: actionsService,
                },
            ],
        }).compile();

        controller = module.get<ActionsController>(ActionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('checkIn', () => {
        it('should return a valid CheckInType response when spaceType is provided', async () => {
            const mockResponse = { parkingSessionId: '123', parkingSpaceId: 1 };
            (actionsService.checkInFirstByType as jest.Mock).mockResolvedValue(mockResponse);

            const result = await controller.checkIn({ spaceType: 'CAR' });
            expect(result).toEqual(mockResponse);
        });

        it('should throw HttpException if spaceType is missing', async () => {
            await expect(controller.checkIn({} as any)).rejects.toThrow(HttpException);
        });
    });

    describe('checkInWithSpace', () => {
        it('should return a valid CheckInType response when parkingSpaceId is provided', async () => {
            const mockResponse = { parkingSessionId: '123', parkingSpaceId: 2 };
            (actionsService.checkInBySpace as jest.Mock).mockResolvedValue(mockResponse);

            const result = await controller.checkInWithSpace({ parkingSpaceId: 2 });
            expect(result).toEqual(mockResponse);
        });

        it('should throw HttpException if parkingSpaceId is missing', async () => {
            await expect(controller.checkInWithSpace({} as any)).rejects.toThrow(HttpException);
        });
    });

    describe('checkOut', () => {
        it('should return a valid CheckOutType response when parkingSpaceId is provided', async () => {
            const mockResponse = { parkingSpaceId: 1, sessionLengthInMinutes: 60, sessionCost: 5 };
            (actionsService.checkOut as jest.Mock).mockResolvedValue(mockResponse);

            const result = await controller.checkOut({ parkingSpaceId: 1 });
            expect(result).toEqual(mockResponse);
        });

        it('should throw HttpException if session is not found', async () => {
            (actionsService.checkOut as jest.Mock).mockRejectedValue(new Error('Session not found'));

            await expect(controller.checkOut({ parkingSpaceId: 1 })).rejects.toThrow(HttpException);
        });
    });
});
