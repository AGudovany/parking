import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ActionsService } from '../services/actions.service';
import {CheckInType, CheckOutType, ParkingSpaceType} from "../common/types";

@Controller()
export class ActionsController {
    constructor(private readonly actionService: ActionsService) {}

    @Post('/check-in')
    async checkIn(@Body() body: { spaceType: ParkingSpaceType}): Promise<CheckInType> {
        if (!body.spaceType) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        try {
            return await this.actionService.checkInFirstByType(body.spaceType);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
    }

    @Post('/check-in/spaces')
    async checkInWithSpace(@Body() body: { parkingSpaceId: number}) {
        if (!body.parkingSpaceId) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        try {
            return await this.actionService.checkInBySpace(body.parkingSpaceId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
    }

    @Post('/check-out')
    async checkOut(@Body() body: { parkingSpaceId: number } ) : Promise<CheckOutType> {
        try {
            return await this.actionService.checkOut(body.parkingSpaceId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
