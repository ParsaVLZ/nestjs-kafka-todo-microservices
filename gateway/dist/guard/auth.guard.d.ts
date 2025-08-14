import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
export declare class AuthGuard implements CanActivate {
    private userClientService;
    private tokenClientService;
    constructor(userClientService: ClientProxy, tokenClientService: ClientProxy);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
