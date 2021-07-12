import { Module } from '@nestjs/common';
import { TelegramModule } from "./telegram/telegram.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from "typeorm";

@Module({
  imports: [
    TelegramModule,
    TypeOrmModule.forRootAsync({
      useFactory: async ()=>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
