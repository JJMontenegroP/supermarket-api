import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Supermarket } from 'src/supermarket/entities/supermarket.entity';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column()
    population: number;

    @ManyToMany(() => Supermarket, (supermarket) => supermarket.cities)
    @JoinTable()
    supermarkets: Supermarket[];
}
