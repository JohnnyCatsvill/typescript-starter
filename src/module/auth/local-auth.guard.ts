
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginOtherDto } from "./dto/login.other.dto";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  canActivate = (context: any) => {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  };
}