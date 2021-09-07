
import { Controller, Request, Post, UseGuards, Body, Get } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags, ApiHeader, ApiBearerAuth, ApiParam, ApiBasicAuth } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { type } from "os";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiBody({type: LoginDto})
  @Post('login')
  async login(@Body() req: LoginDto) {
    let user = await this.authService.validateUser(req.login, req.password);

    if (user != null){
      return this.authService.login(user);
    }
    else{
      return {
        "statusCode": 401,
        "message": "UnauthorizedException"
      };
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('authTest')
  async smth(): Promise<String>{
    return "test test 1 2 3";
  }

  @Post('login/create')
  async loginCreate(@Body() req: LoginDto) {
    return await this.authService.addUser(req.login, req.password) ;
  }
}