import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from '../entities/city.entity';
import { CreateCityDto } from '../dtos/create-city.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';

const ALLOWED_COUNTRIES = ['Argentina', 'Ecuador', 'Paraguay'];

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) { }

    async findAll(): Promise<City[]> {
        return this.cityRepository.find();
    }

    async findOne(id: number): Promise<City> {
        const city = await this.cityRepository.findOneBy({ id });
        if (!city) {
            throw new NotFoundException(`City #${id} not found`);
        }
        return city;
    }

    async create(data: CreateCityDto): Promise<City> {
        if (!ALLOWED_COUNTRIES.includes(data.country)) {
            throw new BadRequestException('country not allowed');
        }
        const newCity = this.cityRepository.create(data);
        return this.cityRepository.save(newCity);
    }

    async update(id: number, data: UpdateCityDto): Promise<City> {
        const city = await this.findOne(id);
        if (!ALLOWED_COUNTRIES.includes(data.country)) {
            throw new BadRequestException('country not allowed');
        }
        Object.assign(city, data);
        return this.cityRepository.save(city);
    }

    async delete(id: number): Promise<void> {
        const city = await this.findOne(id);
        await this.cityRepository.remove(city);
    }
}

