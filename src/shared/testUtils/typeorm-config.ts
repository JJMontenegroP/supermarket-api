import { Supermarket } from "src/supermarket/supermarket.entity";
import { City } from "src/city/city.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        autoLoadEntities: true,
        synchronize: true,
        keepConnectionAlive: true,
    }),
    TypeOrmModule.forFeature([Supermarket, City]),
];