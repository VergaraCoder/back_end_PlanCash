import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request,Response } from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

import * as jwt from 'jsonwebtoken';
import { ManageError } from "src/common/errors/custom/error.custom";


@Injectable()
export class JwtGuard implements CanActivate{

    constructor(
        private AuthService:AuthService,
        private jwtService:JwtService
    ){}

    async canActivate(context: ExecutionContext):Promise<boolean> {
        const request:Request=context.switchToHttp().getRequest();
        const response:Response=context.switchToHttp().getResponse();

        const authHeader = request.headers['authorization'];
        const signedCookies=request.signedCookies;
        
        console.log("THE TOKENS ARE ");
        console.log("NEW LOGGGGGGGGGGGGGGGGGGG, BUT THE TOKENS ARE");
        
        console.log(authHeader);
        
        const token = JSON.parse(authHeader.split(' ')[1]); // Extrae el token
        console.log(token);
        try{
            // if(!signedCookies || !signedCookies["acces_token"] || !signedCookies["refresh_token"]){
                
            //     throw new ManageError({
            //         type:"UNAUTHORIZED",
            //         message:"THE TOKEN MUST BE PROVIDER"
            //     });
            // }   
            if (!authHeader) {
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN MUST BE PROVIDER"
                });
            }
            console.log(token); // Aquí tienes el token
            // Aquí puedes verificar el token, por ejemplo, usando JWT          
            await this.jwtService.verify(token);
            request["user"]=await this.jwtService.decode(token);

            return true;


        }catch(err:any){

            if(err instanceof jwt.TokenExpiredError){

                const newData=await this.AuthService.renovateToken(token);
                response.cookie("acces_token",newData.acces_token,{
                    signed:true,
                    httpOnly:true
                });
                request["user"]=newData.decodeToken;
                return true;
            }
            else if(err instanceof jwt.JsonWebTokenError || jwt.NotBeforeError){
                throw new ManageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN IS NOT VALID OR MUST BE PROVIDER"
                });
            }
            throw ManageError.signedError(err.message);
        }
    }
}