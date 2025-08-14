import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schema/token.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/microservice-todo"),
    MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}])
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
