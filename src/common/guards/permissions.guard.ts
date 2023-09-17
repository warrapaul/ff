import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(context: ExecutionContext): boolean{
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredPermissions){
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRequiredPermissions = requiredPermissions.every((permission) =>
    user.permissions?.includes(permission)
  );
    
  
  if (!hasRequiredPermissions) {
    throw new UnauthorizedException('Insufficient Permissions.');
  }

  return true;

  }
}
