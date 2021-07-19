
import { Controller, Request, Post, UseGuards, Body, Get } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiHeader, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { UserEntity } from "../users/entities/user.entity";
import { LoginOtherDto } from "./dto/login.other.dto";
import { LocalStrategy } from "./local.strategy";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { type } from "os";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiBody({type: LoginOtherDto})
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(@Request() req: LoginOtherDto) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('authTest')
  async smth(): Promise<String>{
    return "test test 1 2 3";
  }

  /*@Post('auth/login/create')
  async loginCreate(@Body() req: LoginDto) {
    return await this.authService.addUser(req.login, req.password) ;
  }*/
}