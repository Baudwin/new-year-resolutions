import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { AnonymousUserService } from "./anonymous-user.service";

@Injectable()
export class AnonymousUserMiddleware implements

NestMiddleware{
    constructor(
        private anonymousUserService:AnonymousUserService
    ){}

    async use(req:Request,res:Response,next:NextFunction){
        const anonUserId = req.cookies?.anon_user_id

        if (anonUserId){
            return next()
        }

        const newUser = await this.anonymousUserService.create()
        
        res.cookie('anon_user_id', newUser.id,{
            httpOnly:true,
            sameSite:'lax',
            secure:process.env.NODE_ENV === 'production',
            maxAge:1000*60*60*24*365
        }) 
   next()
    }

}