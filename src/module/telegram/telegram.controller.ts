import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Put } from "@nestjs/common";
import { TelegramService } from './telegram.service';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { TelegramEntity } from "./entities/telegram.entity";
import { ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from "../projects/dto/create-project.dto";
import { UpdateProjectDto } from "../projects/dto/update-project.dto";

@ApiTags('telegrams')
@Controller('telegrams')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post()
  create(@Body() createTelegramDto: CreateTelegramDto) {
    return this.telegramService.create(createTelegramDto);
  }

  @Get()
  async findAll(@Query('sort') sort, @Query('range') range, @Query('filter') filter, @Res() res) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    return res.json(await this.telegramService.findAll(sort, range, filter, res));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.telegramService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.telegramService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telegramService.remove(+id);
  }
}
