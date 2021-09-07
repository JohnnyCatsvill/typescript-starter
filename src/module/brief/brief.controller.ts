import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Put } from "@nestjs/common";
import { BriefService } from './brief.service';
import { CreateBriefDto } from './dto/create-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('brief')
@Controller('brief')
export class BriefController {
  constructor(private readonly briefService: BriefService) {}

  @Post()
  create(@Body() createBriefDto: CreateBriefDto) {
    return this.briefService.create(createBriefDto);
  }

  @Get()
  async findAll(@Query('sort') sort, @Query('order') order, @Query('page') page, @Query('perPage') perPage, @Query('filter') filter, @Res() res) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    return res.json(await this.briefService.findAll(sort, order, page, perPage, filter, res));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.briefService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefService.update(+id, updateBriefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.briefService.remove(+id);
  }
}
