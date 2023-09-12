import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { JwtPayloadWithRt } from "src/auth/types";
import { RolesService } from "src/roles/roles.service";

export const GetCurrentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      console.log({request})
      if (!data) return request.user;
      return request.user[data];
    },
  );