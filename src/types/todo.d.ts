export interface ITodo {
    _id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateTodoInput {
    title: string;
}

export interface IUpdateTodoInput {
    id: string;
    title?: string;
    completed?: boolean;
}
export interface ITodoResponse {
    success: boolean;
    todo: ITodo;
}

export interface ITodosResponse {
    success: boolean;
    todos: ITodo[];
}
export interface ITodoError {
    status: number;
    data: {
        success: boolean;
        message: string;
    };
}
export interface IDeleteTodoResponse {
    success: boolean;
    message: string;
}
