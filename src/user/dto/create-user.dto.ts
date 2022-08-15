import { IsNotEmpty } from "class-validator";
import { Role } from "../entities/role";

export class CreateUserDto {

    @IsNotEmpty()
    readonly username: string;
  
    @IsNotEmpty()
    readonly email: string;
  
    @IsNotEmpty()
    readonly password: string;

    
    readonly role: Role;
}
