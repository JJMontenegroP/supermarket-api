import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { SupermarketService } from '../services/supermarket.service';
import { CreateSupermarketDto } from '../dtos/create-supermarket.dto';
import { UpdateSupermarketDto } from '../dtos/update-supermarket.dto';

@Controller('supermarkets')
export class supermarketController {
    constructor(private readonly supermarketService: SupermarketService) { }

    @Get()
    findAll() {
        return this.supermarketService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.supermarketService.findOne(id);
    }

    @Post()
    create(@Body() createSupermarketDto: CreateSupermarketDto) {
        return this.supermarketService.create(createSupermarketDto);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() updateSupermarketDto: UpdateSupermarketDto,
    ) {
        return this.supermarketService.update(id, updateSupermarketDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.supermarketService.delete(id);
    }
}
