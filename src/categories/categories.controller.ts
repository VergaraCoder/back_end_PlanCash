import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FilterCategories } from './filterData/filter.budGet';
import { Request } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private FilterDataCategories: FilterCategories
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.FilterDataCategories.filterDataGeneral({dateStart: createCategoryDto.dateStart, dateEnd: createCategoryDto.dateEnd});
    return this.categoriesService.create(createCategoryDto);
  }


  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }


  @UseGuards(JwtGuard)
  @Get('all')
  findAllById( @Req() request:Request) {
    const dataUser:any=request["user"];
    console.log(dataUser);
    return this.categoriesService.findAllById(dataUser.id);
  }


  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request:Request) {
    const dataUser:any=request["user"];
    console.log(dataUser);
    
    return this.categoriesService.findOne(dataUser.id);
  }


  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }



  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
