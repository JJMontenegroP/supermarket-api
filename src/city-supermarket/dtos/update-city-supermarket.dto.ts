import { IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateSupermarketFromCityDto {
    @IsNumber()
    supermarketId: string;

    @IsString()
    name: string;

    @IsNumber()
    latitude: string;

    @IsNumber()
    longitude: string;

    @IsUrl()
    website: string;
}