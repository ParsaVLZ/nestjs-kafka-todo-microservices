"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const token_schema_1 = require("./schema/token.schema");
let TokenService = class TokenService {
    constructor(jwtService, tokenModel) {
        this.jwtService = jwtService;
        this.tokenModel = tokenModel;
    }
    async createToken(userId) {
        const token = this.jwtService.sign({ userId }, {
            expiresIn: 60 * 60 * 24,
            secret: "secret@d32ee3e2434"
        });
        const userToken = await this.tokenModel.findOne({ userId });
        if (userToken) {
            userToken.token = token;
            await userToken.save();
        }
        else {
            await this.tokenModel.create({
                userId,
                token
            });
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: "Token created",
            data: {
                token
            }
        };
    }
    async verifyToken(token) {
        try {
            const verified = this.jwtService.verify(token, {
                secret: "secret@e2425214",
            });
            if (verified?.userId) {
                const existToken = await this.tokenModel.findOne({
                    userId: verified?.userId,
                });
                if (!existToken) {
                    return {
                        message: "token is expired, please login again",
                        error: true,
                        status: 401,
                    };
                }
                return {
                    data: {
                        userId: verified?.userId,
                    },
                    message: "verified successfully",
                    status: 200,
                    error: false,
                };
            }
        }
        catch (error) {
            return {
                message: error?.message ?? "invalid token",
                error: true,
                status: 401,
            };
        }
    }
    async destroyToken(userId) {
        try {
            await this.tokenModel.deleteMany({ userId });
            return {
                message: "destroy successfully",
            };
        }
        catch (error) {
            return {
                message: error?.message ?? "destroy failed",
                error: true,
                status: 400,
            };
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], TokenService);
//# sourceMappingURL=token.service.js.map