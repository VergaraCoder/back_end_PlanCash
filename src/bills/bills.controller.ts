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
  categoryId:number;
  amount:number;
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

    const data:argumentsFilterBills={...createBillDto,userId:dataBills.id};

    await this.filterBillService.filterDataGeneral(data);

    return this.billsService.create(data);
  }

  @Get()
  findAll() {
    return this.billsService.findAll();
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
