import { Body, Controller, Post, Req, UseGuards , Res} from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request, Response } from 'express';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post("login")
  @UseGuards(LocalGuard)
  async createToken(@Body() dataBody:CreateAuthDto , @Req() request:Request, @Res()response:Response) { 
    
    const data:any=request["user"];
    const tokens=await this.authService.creationOfToken(data);
    response.cookie("acces_token",tokens.acces_token,{
      signed:true,
      httpOnly:true
    });

    response.cookie("refresh_token",tokens.refresh_token,{
      signed:true,
      httpOnly:true
    });

    
    response.status(200).json("Tokens creates");
  }
}