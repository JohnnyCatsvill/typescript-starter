import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash, compare } from "bcrypt";
import { UserEntity } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginOtherDto } from "./dto/login.other.dto";

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user);
    console.log(compare(pass, user.hashPass));
    console.log("////////////////////////////////////////////////")
    if (await compare(pass, user.hashPass)) {
      const { hashPass, ...result } = user;
      return result;
    }
    return null;
  }

  async addUser(username: string, pass: string): Promise<any>{

    const saltOrRounds = 10;
    const hashed = await hash(pass, saltOrRounds);
    const user = await this.usersService.addOne(username, hashed);
    const { hashPass, ...result } = user;
    return result;
  }

  async login(user: LoginOtherDto) {
    const payload = { username: user.login, sub: user.id };
    return {
      auth: this.jwtService.sign(payload),
    };
  }
}