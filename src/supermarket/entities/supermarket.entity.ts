import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { City } from 'src/city/entities/city.entity';

@Entity()
export class Supermarket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    length: string;

    @Column()
    latitude: string;

    @Column()
    webPage: string;

    @ManyToMany(() => City, (city) => city.supermarkets)
    cities: City[];
}
