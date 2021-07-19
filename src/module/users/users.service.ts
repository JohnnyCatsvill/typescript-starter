import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({where: {login: username}});
  }

  async addOne(username: string, hash: string): Promise<UserEntity | undefined> {
    let user = this.userRepository.create({
      login: username,
      hashPass: hash,
    });

    try{
      let result = await this.userRepository.save(user);
      return result;
    }
    catch (e) {
      console.log(e);
      return undefined;
    }
  }
}