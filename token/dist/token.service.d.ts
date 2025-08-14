import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { TokenDocument } from 'src/schema/token.schema';
export declare class TokenService {
    private jwtService;
    private tokenModel;
    constructor(jwtService: JwtService, tokenModel: Model<TokenDocument>);
    createToken(userId: string): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            token: string;
        };
    }>;
    verifyToken(token: string): Promise<{
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
    destroyToken(userId: string): Promise<{
        message: string;
        error?: undefined;
        status?: undefined;
    } | {
        message: any;
        error: boolean;
        status: number;
    }>;
}
