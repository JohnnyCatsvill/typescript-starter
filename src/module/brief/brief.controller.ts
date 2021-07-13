import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.briefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.briefService.findOne(+id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateBriefDto: UpdateBriefDto) {
    return this.briefService.update(+id, updateBriefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.briefService.remove(+id);
  }*/
}
