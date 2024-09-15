import { IsString, IsInt, Min, Max, IsIn } from 'class-validator';

export class CreateCityDto {
    @IsString()
    name: string;

    @IsString()
    @IsIn(['Argentina', 'Ecuador', 'Paraguay'], {
        message: 'Country must be Argentina, Ecuador or Paraguay',
    })
    country: string;

    @IsInt()
    @Min(0)
    @Max(10000000)
    population: number;
}