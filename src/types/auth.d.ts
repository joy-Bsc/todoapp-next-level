export interface IRegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}
export interface IAuthResponse {
    success: boolean;
    message: string;
    token: string;
    user:{
        _id: string;
        name: string;
        email: string;   
    };
}
export interface IAuthError {
    status: number;
    data: {
        success: boolean;
        message: string;
    };
}

export interface IAuthState {
    _id: string;
    name: string;
    email: string;   
}
