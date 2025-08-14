import { TokenService } from './token.service';
export type UserTokenPayload = {
    userId: string;
};
export type VerifyToken = {
    token: string;
};
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    createUserToken({ userId }: UserTokenPayload): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            token: string;
        };
    }>;
    verifyToken({ token }: VerifyToken): Promise<{
        data: {
            userId: string;
        };
        message: string;
        status: number;
        error: boolean;
    } | {
        message: any;
        error: boolean;
        status: number;
        data?: undefined;
    }>;
    destroyToken({ userId }: UserTokenPayload): Promise<{
        message: string;
        error?: undefined;
        status?: undefined;
    } | {
        message: any;
        error: boolean;
        status: number;
    }>;
}
