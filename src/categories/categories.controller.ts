import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FilterCategories } from './filterData/filter.budGet';
import { Request, Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private FilterDataCategories: FilterCategories
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log("ENTER ");
    console.log(createCategoryDto);
    
    
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
  findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('final')
  updateFnal(@Body() updateCategorysDtos: any[]) {
    console.log("the data is ");
    console.log(updateCategorysDtos);
    
    const responseData=this.categoriesService.updateAllCategories(updateCategorysDtos);
    return responseData;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.FilterDataCategories.filterDataGeneral({dateStart: updateCategoryDto.dateStart, dateEnd: updateCategoryDto.dateEnd});
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
