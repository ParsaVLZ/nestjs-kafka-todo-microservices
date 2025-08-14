import { CanActivate, ExecutionContext } from "@nestjs/common";
import { OnModuleInit } from "@nestjs/common/interfaces";
import { ClientKafka } from "@nestjs/microservices";
export declare class AuthGuard implements CanActivate, OnModuleInit {
    private userClientService;
    private tokenClientService;
    constructor(userClientService: ClientKafka, tokenClientService: ClientKafka);
    onModuleInit(): Promise<void>;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
