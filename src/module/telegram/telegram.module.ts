import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegramEntity } from "./entities/telegram.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TelegramEntity])],
  controllers: [TelegramController],
  providers: [TelegramService]
})
export class TelegramModule {}
