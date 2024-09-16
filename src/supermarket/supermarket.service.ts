import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermarket } from './supermarket.entity';
import { CreateSupermarketDto } from './dtos/create-supermarket.dto';
import { UpdateSupermarketDto } from './dtos/update-supermarket.dto';

@Injectable()
export class SupermarketService {
    constructor(
        @InjectRepository(Supermarket)
        private readonly supermarketRepository: Repository<Supermarket>,
    ) { }

    // Método para obtener todos los supermarkets
    async findAll(): Promise<Supermarket[]> {
        return this.supermarketRepository.find();
    }

    // Método para obtener un supermarket por su ID
    async findOne(id: string): Promise<Supermarket> {
        const supermarket = await this.supermarketRepository.findOne({ where: { id } });
        if (!supermarket) {
            throw new NotFoundException(`Supermarket con ID ${id} not found`);
        }
        return supermarket;
    }

    async create(createSupermarketDto: CreateSupermarketDto): Promise<Supermarket> {
        if (createSupermarketDto.name.length < 10) {
            throw new BadRequestException('The supermarket name must be at least 10 characters');
        }

        const newSupermarket = this.supermarketRepository.create(createSupermarketDto);
        return this.supermarketRepository.save(newSupermarket);
    }

    async update(id: string, updateSupermarketDto: UpdateSupermarketDto): Promise<Supermarket> {
        const supermarket = await this.findOne(id);

        if (updateSupermarketDto.name && updateSupermarketDto.name.length < 10) {
            throw new BadRequestException('The supermarket name must be at least 10 characters');
        }

        Object.assign(supermarket, updateSupermarketDto);
        return this.supermarketRepository.save(supermarket);
    }

    async delete(id: string): Promise<void> {
        const supermarket = await this.findOne(id);
        await this.supermarketRepository.remove(supermarket);
    }
}
