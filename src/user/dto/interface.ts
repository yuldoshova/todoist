import { Role } from "../entities/role";

export interface UserData {
    id: number;
    username: string;
    email: string;
    role?: Role;
    password: string;
    isBlocked?: boolean | false;
    photoUrl?: string | null;
}


export interface UserRO {
    user: UserData;
}