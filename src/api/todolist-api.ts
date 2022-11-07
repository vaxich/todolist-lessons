import axios from "axios";
import {TaskType} from "../Todolist";
import {TaskStateType} from "../AppWithRedux";

export type UpdateTaskModelType = {
    title:string,
    descroption: string,
    status: boolean,
    priority: number,
    startDate:string,
    deadLine:string
}
type GetTasksResponse = {
    error:string | null,
    totalCount: number,
    items: TaskType[]
}


let instanse = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': '4a93d057-d084-4a69-a91d-384fa34f59d8'
    }
})


export const todolistApi = {
    getTodolists() {
        return instanse.get<Array<TodolistApiType>>('todo-lists' )
    },
    createTodolist(title:string) {
        return instanse.post<BaseResponseType<{item:TodolistApiType}>>('todo-lists', {title} )

    },
    deleteTodolist(todolistId:string) {
        return instanse.delete<BaseResponseType>(`todo-lists/${todolistId}`  )

    },
    updateTodolistTitle(todolistId:string, title:string) {
        return instanse.put<BaseResponseType>(`/todo-lists/${todolistId}`, {title  } )

    },
    getTasks(todolistId:string) {
        return instanse.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks` )

    },
    deleteTask(todolistId:string, taskId:string){
        return instanse.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}` )
    },
    createTask(todolistId:string){
        return instanse.post<BaseResponseType<{item:TaskType }>>(`/todo-lists/${todolistId}/tasks` )
    },
    updateTask(todolistId:string, taskId:string, model:UpdateTaskModelType){
        return instanse.put<BaseResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model )
    }
}


export const authAPI = {
    login() {
    }
}


export type TodolistApiType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type BaseResponseType<T = {} > = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T
}
