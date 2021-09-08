import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    
    if (user){
      if (await compare(password, user.hashPass)) {
        const { hashPass, ...result } = user;
        return result;
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }
  }

  async addUser(username: string, pass: string): Promise<any>{

    const saltOrRounds = 10;
    const hashed = await hash(pass, saltOrRounds);
    const user = await this.usersService.addOne(username, hashed);
    const { hashPass, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.login , sub: user.id };
    return { auth: this.jwtService.sign(payload) };
  }
}