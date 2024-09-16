import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupermarketService } from './supermarket.service';
import { supermarketController } from './supermarket.controller';
import { Supermarket } from './supermarket.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Supermarket])], // Importa el repositorio de Supermercado
    controllers: [supermarketController],
    providers: [SupermarketService],
})
export class SupermarketModule { }
