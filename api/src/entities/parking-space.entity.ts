import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ParkingSpace {
    @PrimaryColumn()
    id: number;

    @Column()
    floor: number;

    @Column({ type: 'enum', enum: ['CAR', 'MOTOR', 'RESIDENT'] })
    spaceType: 'CAR' | 'MOTOR' | 'RESIDENT';

    @Column({ default: false })
    isOccupied: boolean;

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    hourlyRate: number;
}