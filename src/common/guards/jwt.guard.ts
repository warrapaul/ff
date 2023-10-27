import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../decorators";
import { REQUIRE_AUTH_KEY } from "../decorators/require-auth.decorator";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    //apply decorators at function or class levels


    
    //secure all routes execpt routes with @IsPublic() decorator
    // @Get('secured')
    // @IsPublic()
    // myControllerFunction()
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;


    // //set all routes as public execpt routes with @RequireAuth() decorator
    // // @Get('secured')
    // // @RequireAuth()
    // // myControllerFunction()
    // const requireAuth = this.reflector.getAllAndOverride(REQUIRE_AUTH_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (!requireAuth) return true;


    return super.canActivate(context);
  }
}