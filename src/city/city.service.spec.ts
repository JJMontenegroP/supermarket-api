import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";

import { TypeOrmTestingConfig } from "src/shared/testUtils/typeorm-config";
import { City } from "../city/city.entity"
import { CityService } from "../city/city.service";

describe("CityService", () => {
    let service: CityService;
    let repository: Repository<City>;
    let supermarketsList: City[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [CityService],
        }).compile();

        service = module.get<CityService>(CityService);
        repository = module.get<Repository<City>>(getRepositoryToken(City));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        repository.clear();
        supermarketsList = [];
        for (let i = 0; i < 5; i++) {
            const city: City = await repository.save({
                city: faker.location.city(),
                code: faker.location.zipCode(),
                name: faker.word.noun(),
                country: faker.location.country(),
            });
            supermarketsList.push(city);
        }
    };

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should return all supermarkets", async () => {
        const supermarkets: City[] = await service.findAll();
        expect(supermarkets).not.toBeNull();
        expect(supermarkets).toHaveLength(supermarketsList.length);
    });

    it("should return city by id", async () => {
        const storedSupermarket: City = supermarketsList[0];
        const city: City = await service.findOne(storedSupermarket.id);
        expect(city).not.toBeNull();
        expect(city.name).toEqual(storedSupermarket.name);
    });

    it("should throw an error when city with given id is not found", async () => {
        await expect(service.findOne("-1")).rejects.toHaveProperty(
            "message",
            "City not found",
        );
    });

    it("should create a city", async () => {
        const supermarketData = {
            name: faker.location.city(),
            length: faker.location.zipCode(),
            longitude: faker.word.noun(),
            webPage: faker.location.country(),
            country: faker.location.country(),
            population: faker.number.int(),
        };

        const createdSupermarket: City = await service.create(supermarketData);

        expect(createdSupermarket).not.toBeNull();
        expect(createdSupermarket.id).toBeDefined();
        expect(createdSupermarket.name).toEqual(supermarketData.name);
    });

    it("should update a city", async () => {
        const city: City = supermarketsList[0];
        city.name = `${faker.word.verb()} NEW`;

        const updatedSupermarket: City = await service.update(city.id, city);
        expect(updatedSupermarket).not.toBeNull();
        expect(updatedSupermarket.name).toEqual(city.name);
    });

    it("should throw an error when city with given id is not found", async () => {
        const city: City = supermarketsList[0];
        city.name = `${faker.company.name()} UPDATED`;

        await expect(service.update("-1", city)).rejects.toHaveProperty(
            "message",
            "City not found",
        );
    });

    it("should delete a city", async () => {
        const city: City = supermarketsList[0];
        await service.delete(city.id);

        const deletedSupermarket: City = await repository.findOne({
            where: { id: city.id },
        });
        expect(deletedSupermarket).toBeNull();
    });

    it("should throw an error when city with given id is not found", async () => {
        await expect(service.delete("-1")).rejects.toHaveProperty(
            "message",
            "City not found",
        );
    });
});