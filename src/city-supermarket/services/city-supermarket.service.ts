import { Injectable } from '@nestjs/common';
import { CityService } from '../../city/services/city.service';
import { SupermarketService } from '../../supermarket/services/supermarket.service';

@Injectable()
export class CitySupermarketService {
    constructor(
        private readonly cityService: CityService,
        private readonly supermarketService: SupermarketService,
    ) { }

    async addSupermarketToCity(cityId: number, supermarketId: number): Promise<void> {
        const city = await this.cityService.findOne(cityId);
        const supermarket = await this.supermarketService.findOne(supermarketId);
        city.supermarkets.push(supermarket);
        await this.cityService.update(cityId, city);
    }
}
