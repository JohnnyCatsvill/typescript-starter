import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginEntity } from "./entity/login.entity";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([LoginEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    ],

  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
