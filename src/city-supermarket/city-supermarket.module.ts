import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitySupermarketService } from './city-supermarket.service';
import { CitySupermarketController } from './city-supermarket.controller';
import { City } from 'src/city/city.entity';
import { Supermarket } from 'src/supermarket/supermarket.entity';

@Module({
    imports: [TypeOrmModule.forFeature([City, Supermarket])], // Importamos ambas entidades
    controllers: [CitySupermarketController],
    providers: [CitySupermarketService],
})
export class CitySupermarketModule { }
