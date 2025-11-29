export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserResponse {
    success: boolean;
    user: IUser;
    token?: string;
}