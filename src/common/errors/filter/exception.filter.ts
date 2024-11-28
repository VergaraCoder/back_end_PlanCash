import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";



@Catch()
export class FilterError implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const response:Response=host.switchToHttp().getResponse();
        const request:Request=host.switchToHttp().getRequest();

        const ifExist:string[]=exception.message.split(" :: ");
        const ifExist2=exception.response;
        let message;
        let status;   
            
    
        if(ifExist2 && ifExist2.message){
            message=ifExist2.message;
            status=ifExist2.statusCode ? ifExist2.statusCode : 400;
        }

        else if(ifExist.length){
            message=ifExist[1];
            status=HttpStatus[ifExist[0]];
        }

        else{
            message="INTERNAL SERVER ERROR";
            status=500;
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method:request.method,
            message: message,
        });
    }
}