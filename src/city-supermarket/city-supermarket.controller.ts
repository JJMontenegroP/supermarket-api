import { Controller, Post, Get, Delete, Param, Body, Put } from '@nestjs/common';
import { CitySupermarketService } from './city-supermarket.service';
import { UpdateSupermarketFromCityDto } from './dtos/update-city-supermarket.dto';

@Controller('cities/:cityId/supermarkets')
export class CitySupermarketController {
    constructor(private readonly citySupermarketService: CitySupermarketService) { }

    @Post(':supermarketId')
    addSupermarketToCity(
        @Param('cityId') cityId: string,
        @Param('supermarketId') supermarketId: string,
    ) {
        return this.citySupermarketService.addSupermarketToCity(cityId, supermarketId);
    }

    @Get()
    findSupermarketsFromCity(@Param('cityId') cityId: string) {
        return this.citySupermarketService.findSupermarketsFromCity(cityId);
    }

    @Get(':supermarketId')
    findSupermarketFromCity(
        @Param('cityId') cityId: string,
        @Param('supermarketId') supermarketId: string,
    ) {
        return this.citySupermarketService.findSupermarketFromCity(cityId, supermarketId);
    }

    @Put()
    async updateSupermarketsFromCity(
        @Param('cityId') cityId: string,
        @Body() supermarketsDto: UpdateSupermarketFromCityDto[],
    ) {
        return this.citySupermarketService.updateSupermarketsFromCity(cityId, supermarketsDto);
    }

    @Delete(':supermarketId')
    deleteSupermarketFromCity(
        @Param('cityId') cityId: string,
        @Param('supermarketId') supermarketId: string,
    ) {
        return this.citySupermarketService.deleteSupermarketFromCity(cityId, supermarketId);
    }
}
