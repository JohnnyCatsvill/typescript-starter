import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { TelegramEntity } from "./entities/telegram.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post()
  create(@Body() createTelegramDto: CreateTelegramDto) {
    return this.telegramService.create(createTelegramDto);
  }

  @Get()
  async findAll(): Promise<TelegramEntity[]> {
    return await this.telegramService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.telegramService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTelegramDto: UpdateTelegramDto) {
    return this.telegramService.update(+id, updateTelegramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telegramService.remove(+id);
  }*/
}
