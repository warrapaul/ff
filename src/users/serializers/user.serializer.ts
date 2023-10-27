import { Exclude,Expose,Transform } from "class-transformer";
import { Role } from "src/roles/entities/role.entity";
import {format} from "date-fns"
export class UserSerializer {
    name: string;
    email: string;
    phoneNumber: string;    
    status: string;

    // @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"), { toPlainOnly: true })
    @Transform(({ value }) => format(value, "dd-MM-yyyy"), { toPlainOnly: true })
    createdAt: Date;

  
    @Expose()
    get name_email(): string {
        return `${this.name} ${this.email}`;
    }



    @Exclude()
    updatedAt: Date;

    @Exclude()
    password: string;

    @Exclude()
    hash: string; 

    @Exclude()
    hashRt: string;

    @Transform(({value})=>({
        id: value.id,
        name: value.name
    }))
    role:Role;

    constructor(partial: Partial<UserSerializer>) {
        Object.assign(this, partial);
      }

}