import {Controller, Get, UseInterceptors} from '@nestjs/common';
import { OccupationService } from '../services/occupation.service';
import {CacheInterceptor, CacheKey, CacheTTL} from "@nestjs/cache-manager";

@Controller()
@UseInterceptors(CacheInterceptor)
export class OccupationController {
    constructor(private readonly occupationService: OccupationService) {}

    @Get('generalInfo')
    @CacheKey('generalInfo')
    @CacheTTL(300000)
    async getGeneralInfo() {
        return await this.occupationService.getOccupationGeneralInfo();
    }

    @Get('occupation')
    @CacheKey('occupation')
    @CacheTTL(300000)
    async getOccupation() {
        return await this.occupationService.getOccupationStatus();
    }
}
