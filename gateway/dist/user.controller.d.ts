import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, UserSignupDto } from './dto/user.dto';
import { Request } from "express";
export declare class UserController {
    private userClientService;
    private tokenClientService;
    constructor(userClientService: ClientProxy, tokenClientService: ClientProxy);
    signup(signupDto: UserSignupDto): Promise<{
        token: any;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: any;
    }>;
    logout(req: Request): Promise<any>;
}
