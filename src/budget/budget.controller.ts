import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';


interface PayloadToken{
  userId:number;
  email:string;
}


@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto, @Req() request: Request) {
    const payloadToken:PayloadToken=request["user"] as PayloadToken;    
    console.log("ENTER POST ");
        
    return this.budgetService.createBudGet({...createBudgetDto,idUser:payloadToken.userId });
  }

  @UseGuards(JwtGuard)
  @Get("all")
  findAll() {
    console.log("ENTER GET ALL ");
    return this.budgetService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('one')
  findOneByIdUser(@Param('id') id: string,@Req() request:Request) {
    console.log("ENTER GET ONE");
    const dataUser:any=request["user"];
    return this.budgetService.findOneByIdUser(dataUser.userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    console.log("ENTER TO UPDATED");
    
    return this.budgetService.update(+id, updateBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
