import { Body, Controller, HttpException, Inject, InternalServerErrorException, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiConsumes } from '@nestjs/swagger';
import { LoginDto, UserSignupDto } from './dto/user.dto';
import { catchError, lastValueFrom } from 'rxjs';
import { TokenPatterns } from './enum/token.events';
import { UserPatterns } from './enum/user.event';
import { ServiceResponse } from './interface/common/response.interface';
import { Request } from "express";
import Authorization from './decorators/auth.decorator';

@Controller('/user')
export class UserController {
  constructor(
    @Inject("USER_SERVICE") private userClientService: ClientProxy,
    @Inject("TOKEN_SERVICE") private tokenClientService: ClientProxy
  ) {}

  @Post('signup')
  @ApiConsumes("application/x-www-form-urlencoded")
  async signup(@Body() signupDto: UserSignupDto){
    const response = await lastValueFrom(
      this.userClientService.send("signup", signupDto).pipe(
        catchError(err => {
          throw err;
        })
      )
    );
    if(response?.error){
      throw new HttpException(response?.message, response?.status ?? 500)
    }
    if(response?.data?.userId){
      const tokenResponse = await lastValueFrom(
        this.tokenClientService.send("create_user_token", {userId: response?.data?.userId})
      );
      if(tokenResponse?.data?.token) {
        return {
          token: tokenResponse?.data?.token
        }
      }
    }
    throw new InternalServerErrorException("Some services are missing")
  }

  @Post("login")
  @ApiConsumes("application/x-www-form-urlencoded")
  async login(@Body() loginDto: LoginDto) {
    const loginResponse: ServiceResponse = await lastValueFrom(
      this.userClientService.send(UserPatterns.Login, loginDto).pipe(
        catchError((err) => {
          throw err;
        })
      )
    );
    if (!loginResponse?.error && loginResponse?.data) {
      return {
        token: loginResponse?.data?.token,
      };
    }
    throw new HttpException(loginResponse?.message, loginResponse?.status);
  }
  @Post("logout")
  @Authorization()
  async logout(@Req() req: Request) {
    const {user} = req;
    return await lastValueFrom(
      this.tokenClientService
        .send(TokenPatterns.TokenDestroy, {userId: user?._id})
        .pipe(
          catchError((err) => {
            throw err;
          })
        )
    );
  } 
}
