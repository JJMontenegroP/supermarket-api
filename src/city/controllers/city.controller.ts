import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CityService } from '../services/city.service';
import { CreateCityDto } from '../dtos/create-city.dto';
import { UpdateCityDto } from '../dtos/update-city.dto';

@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @Get()
    findAll() {
        return this.cityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.cityService.findOne(id);
    }

    @Post()
    create(@Body() createCityDto: CreateCityDto) {
        return this.cityService.create(createCityDto);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCityDto: UpdateCityDto,
    ) {
        return this.cityService.update(id, updateCityDto);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.cityService.delete(id);
    }
}
