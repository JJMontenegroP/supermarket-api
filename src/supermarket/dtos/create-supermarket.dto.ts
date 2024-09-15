import { IsString, IsUrl, Length } from 'class-validator';

export class CreateSupermarketDto {
    @IsString()
    @Length(10, 255, { message: 'El nombre debe tener al menos 10 caracteres' })
    name: string;

    @IsString()
    length: string;

    @IsString()
    latitude: string;

    @IsUrl()
    webPage: string;
}
