import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CityModule } from "./city/city.module";
import { SupermarketModule } from "./supermarket/supermarket.module";
import { CitySupermarketModule } from "./city-supermarket/city-supermarket.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      type: "postgres",
      username: process.env.DB_USER,
    }),
    CityModule,
    SupermarketModule,
    CitySupermarketModule,
  ],
})
export class AppModule { }