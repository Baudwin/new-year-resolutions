import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { AnonymousUserService } from "./anonymous-user.service";

@Injectable()
export class AnonymousUserMiddleware implements

NestMiddleware{
    constructor(
        private anonymousUserService:AnonymousUserService
    ){}
    
    async use(req: Request, res: Response, next: NextFunction) {
    let anonUserId = req.cookies?.anon_user_id;


    if (!anonUserId) {
    console.log("Cookie doesnt exist")
      const user = await this.anonymousUserService.create();

      anonUserId = user.id;

      res.cookie('anon_user_id', anonUserId, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        path:'/',
        domain:'newyear-resolutions.online',
        maxAge: 1000 * 60 * 60 * 24 * 365, 
      });
 
     req['anonymousUser'] = user;
    } 
    
    else {
      const user = await this.anonymousUserService.findOne(anonUserId);
        console.log("finding user...")
      if (!user) {
        console.log("user doesnt exist")
        const newUser = await this.anonymousUserService.create();
        res.cookie('anon_user_id', newUser.id, {
        httpOnly: true, 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
         path:'/',
         domain:'newyear-resolutions.online',
        maxAge: 1000 * 60 * 60 * 24 * 365, 
      });

        req['anonymousUser'] = newUser;
      } else {
        req['anonymousUser'] = user;
        console.log("user exists")
      }
    }
    
    next();
  }

}