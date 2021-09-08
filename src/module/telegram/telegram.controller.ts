import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Put } from "@nestjs/common";
import { TelegramService } from './telegram.service';
import { CreateTelegramDto } from './dto/create-telegram.dto';
import { UpdateTelegramDto } from './dto/update-telegram.dto';
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { findAllTelegramQuerryDTO } from "./dto/findAll-TelegramQuerry.dto";

@ApiTags('telegrams')
@Controller('telegrams')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post()
  create(@Body() createTelegramDto: CreateTelegramDto) {
    return this.telegramService.create(createTelegramDto);
  }

  @ApiQuery({type: findAllTelegramQuerryDTO})
  @Get()
  async findAll(@Query('sort') sort, @Query('order') order, @Query('page') page, @Query('perPage') perPage, @Query('filter') filter, @Res() res) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    return res.json(await this.telegramService.findAll(sort, order, page, perPage, filter, res));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.telegramService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTelegramDto: UpdateTelegramDto) {
    return this.telegramService.update(+id, updateTelegramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telegramService.remove(+id);
  }
}
