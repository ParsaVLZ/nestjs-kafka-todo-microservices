import { OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { Request } from "express";
import { LoginDto, UserSignupDto } from "./dto/user.dto";
export declare class UserController implements OnModuleInit {
    private userClientService;
    private tokenClientService;
    constructor(userClientService: ClientKafka, tokenClientService: ClientKafka);
    onModuleInit(): Promise<void>;
    signup(signupDto: UserSignupDto): Promise<{
        token: any;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: any;
    }>;
    checkLogin(req: Request): Promise<{
        _id: string;
        name: string;
        email: string;
        password: string;
    }>;
    logout(req: Request): Promise<{
        message: any;
    }>;
}
