import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from 'src/city/city.entity';
import { Supermarket } from 'src/supermarket/supermarket.entity';

import { UpdateSupermarketFromCityDto } from './dtos/update-city-supermarket.dto';

@Injectable()
export class CitySupermarketService {
    constructor(
        @InjectRepository(City) private readonly cityRepository: Repository<City>,
        @InjectRepository(Supermarket) private readonly supermarketRepository: Repository<Supermarket>,
    ) { }

    async addSupermarketToCity(cityId: string, supermarketId: string) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });
        const supermarket = await this.supermarketRepository.findOne({ where: { id: supermarketId } });

        if (!city || !supermarket) {
            throw new NotFoundException('City o supermarket no encontrado');
        }

        city.supermarkets.push(supermarket);
        return this.cityRepository.save(city);
    }

    async findSupermarketsFromCity(cityId: string) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });

        if (!city) {
            throw new NotFoundException(`City con ID ${cityId} no encontrada`);
        }

        return city.supermarkets;
    }

    async findSupermarketFromCity(cityId: string, supermarketId: string) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });

        if (!city) {
            throw new NotFoundException(`City con ID ${cityId} no encontrada`);
        }

        const supermarket = city.supermarkets.find((sm) => sm.id === supermarketId);

        if (!supermarket) {
            throw new NotFoundException(`Supermarket con ID ${supermarketId} no encontrado en la city`);
        }

        return supermarket;
    }

    async updateSupermarketsFromCity(
        cityId: string,
        supermarketsDto: UpdateSupermarketFromCityDto[],
    ) {
        const city = await this.cityRepository.findOne({
            where: { id: cityId },
            relations: ['supermarkets'],
        });

        if (!city) {
            throw new NotFoundException(`Ciudad con ID ${cityId} no encontrada`);
        }

        const updatedSupermarkets = [];

        for (const dto of supermarketsDto) {
            let supermarket = await this.supermarketRepository.findOne({
                where: { id: dto.supermarketId },
            });

            if (!supermarket) {
                throw new NotFoundException(
                    `Supermercado con ID ${dto.supermarketId} no encontrado`,
                );
            }

            supermarket.name = dto.name;
            supermarket.latitude = dto.latitude;
            supermarket.length = dto.longitude;
            supermarket.webPage = dto.website;


            const updatedSupermarket = await this.supermarketRepository.save(supermarket);
            updatedSupermarkets.push(updatedSupermarket);
        }

        city.supermarkets = updatedSupermarkets;

        return this.cityRepository.save(city);
    }


    async deleteSupermarketFromCity(cityId: string, supermarketId: string) {
        const city = await this.cityRepository.findOne({ where: { id: cityId }, relations: ['supermarkets'] });

        if (!city) {
            throw new NotFoundException(`City con ID ${cityId} no encontrada`);
        }

        city.supermarkets = city.supermarkets.filter((sm) => sm.id !== supermarketId);

        return this.cityRepository.save(city);
    }
}
