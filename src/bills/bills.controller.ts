import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { request } from 'http';
import { Request } from 'express';
import { FilterBillService } from './filterData/filter.budGet';


export interface argumentsFilterBills{
  userId:number;
  value:number;
}

@Controller('bills')
export class BillsController {
  constructor(
    private readonly billsService: BillsService,
    private filterBillService: FilterBillService
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() request:Request, @Body()createBillDto:CreateBillDto) {
    const dataBills:any=request["user"];
  
    // const data:argumentsFilterBills={userId:dataBills.userId};
    const infoToFilter=createBillDto[0];

    await this.filterBillService.filterDataGeneral({userId:dataBills.userId,categoryId:infoToFilter.categoryId,});

    return this.billsService.create(createBillDto);
  }


  @UseGuards(JwtGuard)
  @Post("final")
  async createAll(@Body()createBillDto:CreateBillDto[]) {
    return this.billsService.createAll(createBillDto);
  }


  @UseGuards(JwtGuard)
  @Get("all")
  findAll(@Req() request:Request) {
    const idUser:any= request["user"];
    console.log("el id");
    console.log();
    
    return this.billsService.findAll(idUser.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billsService.remove(+id);
  }
}
