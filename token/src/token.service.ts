import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from 'src/schema/token.schema';
import {UserTokenPayload} from "./token.controller";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>
  ){}

  async createToken(userId: string){
    const token = this.jwtService.sign({userId}, {
      expiresIn: 60*60*24,
      secret: "secret@d32ee3e2434"
    });
    const userToken = await this.tokenModel.findOne({userId});
    if(userToken){
      userToken.token = token;
      await userToken.save()
    }else {
      await this.tokenModel.create({
        userId,
        token
      });
    }
    return {
      status: HttpStatus.CREATED,
      message: "Token created",
      data: {
        token
      }
    }
  }

  async verifyToken(token: string) {
    try {
      const verified: UserTokenPayload = this.jwtService.verify(token, {
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
    } catch (error) {
      return {
        message: error?.message ?? "invalid token",
        error: true,
        status: 401,
      };
    }
  }
  async destroyToken(userId: string) {
    try {
      await this.tokenModel.deleteMany({userId});
      return {
        message: "destroy successfully",
      };
    } catch (error) {
      return {
        message: error?.message ?? "destroy failed",
        error: true,
        status: 400,
      };
    }
  }
}
