import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Header, Put } from "@nestjs/common";
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { findAllProjectQuerryDTO } from "./dto/findAll-projectQuerry.dto";
import { REQUEST } from "@nestjs/core";

let x_count;

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    console.log(createProjectDto);
    return this.projectsService.create(createProjectDto);
  }

  @ApiQuery({type: findAllProjectQuerryDTO, required: false})
  @Get()
  async findAll(@Param('sort') sort, @Query('order') order, @Query('page') page, @Query('perPage') perPage, @Query('filter') filter, @Res() res,) {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count')
    return res.json(await this.projectsService.findAll(sort, order, page, perPage, filter, res));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(await this.projectsService.findOne(+id));
    return await this.projectsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
