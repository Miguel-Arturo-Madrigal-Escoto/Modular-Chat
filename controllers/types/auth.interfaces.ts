
export interface ISignUpBody {
    base_user: number;
    name: string;
    email: string;
    role: string;
}

export interface IUpdateUser {
    base_user: number;
    name: string;
}