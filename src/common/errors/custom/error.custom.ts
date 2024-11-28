import {HttpException, HttpStatus} from '@nestjs/common';

export class ManageError  extends Error{
    constructor({type,message}:{type:keyof typeof HttpStatus,message:string}){
        super(`${type} :: ${message}`);
    }

    public static signedError(message:string){
        const nameError:string[]=message.split(" :: ");
        if(nameError){
            throw new HttpException(message,HttpStatus[nameError[0]]);
        }else{
            throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}