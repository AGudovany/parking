import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ParkingSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    parkingSpaceId: number;

    @CreateDateColumn()
    startTime: Date;

    @Column({nullable: true })
    endTime: Date;
}
