import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { City } from './city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCityDto } from './dtos/create-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';

const ALLOWED_COUNTRIES = ['Argentina', 'Ecuador', 'Paraguay'];

describe('CityService', () => {
    let service: CityService;
    let repository: Repository<City>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CityService,
                {
                    provide: getRepositoryToken(City),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<CityService>(CityService);
        repository = module.get<Repository<City>>(getRepositoryToken(City));
    });

    describe('findAll', () => {
        it('should return an array of cities', async () => {
            const cities: City[] = [{ id: '1', name: 'Quito', country: 'Ecuador', population: 1500000, supermarkets: [] }];
            jest.spyOn(repository, 'find').mockResolvedValueOnce(cities);

            const result = await service.findAll();
            expect(result).toEqual(cities);
        });
    });

    describe('findOne', () => {
        it('should return a city when found', async () => {
            const city: City = { id: '1', name: 'Quito', country: 'Ecuador', population: 1500000, supermarkets: [] };
            jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(city);

            const result = await service.findOne('1');
            expect(result).toEqual(city);
        });

        it('should throw NotFoundException when city is not found', async () => {
            jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create and return a new city', async () => {
            const createCityDto: CreateCityDto = { name: 'Buenos Aires', country: 'Argentina', population: 3000000 };
            const savedCity: City = { id: '1', ...createCityDto, supermarkets: [] };

            jest.spyOn(repository, 'create').mockReturnValueOnce(savedCity);
            jest.spyOn(repository, 'save').mockResolvedValueOnce(savedCity);

            const result = await service.create(createCityDto);
            expect(result).toEqual(savedCity);
        });

        it('should throw BadRequestException for invalid country', async () => {
            const createCityDto: CreateCityDto = { name: 'Bogotá', country: 'Colombia', population: 8000000 };

            await expect(service.create(createCityDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('should update and return the city', async () => {
            const city: City = { id: '1', name: 'Quito', country: 'Ecuador', population: 1500000, supermarkets: [] };
            const updateCityDto: UpdateCityDto = { name: 'Guayaquil', country: 'Ecuador', population: 2000000 };
            const updatedCity = { ...city, ...updateCityDto };

            jest.spyOn(service, 'findOne').mockResolvedValueOnce(city);
            jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedCity);

            const result = await service.update('1', updateCityDto);
            expect(result).toEqual(updatedCity);
        });

        it('should throw BadRequestException for invalid country on update', async () => {
            const city: City = { id: '1', name: 'Quito', country: 'Ecuador', population: 1500000, supermarkets: [] };
            const updateCityDto: UpdateCityDto = { name: 'Bogotá', country: 'Colombia', population: 8000000 };

            jest.spyOn(service, 'findOne').mockResolvedValueOnce(city);

            await expect(service.update('1', updateCityDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('delete', () => {
        it('should delete the city', async () => {
            const city: City = { id: '1', name: 'Quito', country: 'Ecuador', population: 1500000, supermarkets: [] };

            jest.spyOn(service, 'findOne').mockResolvedValueOnce(city);
            jest.spyOn(repository, 'remove').mockResolvedValueOnce(city);

            await service.delete('1');
            expect(repository.remove).toHaveBeenCalledWith(city);
        });

        it('should throw NotFoundException if city to delete is not found', async () => {
            jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

            await expect(service.delete('1')).rejects.toThrow(NotFoundException);
        });
    });
});
