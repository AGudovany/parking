import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ActionsController} from './controllers/actions.controller';
import {OccupationController} from './controllers/occupation.controller';
import {ActionsService} from './services/actions.service';
import {OccupationService} from './services/occupation.service';
import {InitService} from './services/init.service';
import {ParkingSession} from './entities/parking-session.entity';
import {ParkingSpace} from './entities/parking-space.entity';
import {UtilityService} from "./services/utility.service";
import {CacheModule} from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forFeature([ParkingSpace, ParkingSession]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'parking_business',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            retryAttempts: 5,
            retryDelay: 3000,
        }),
    ],
    controllers: [ActionsController, OccupationController],
    providers: [InitService, UtilityService, ActionsService, OccupationService],
})
export class AppModule {
}
