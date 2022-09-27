import axios from "axios";

let instanse = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': '4a93d057-d084-4a69-a91d-384fa34f59d8'
    }
})


export const todolistApi = {
    getTodos() {
        return instanse.get<Array<TodoType>>('todo-lists', )
    },
    createTodo(title:string) {
        return instanse.post<BaseResponseType<{item:TodoType}>>('todo-lists', {title} )

    },
    deleteTodo(todolistId:string) {
        return instanse.delete<BaseResponseType>(`todo-lists/${todolistId}`  )

    },
    updateTodoTitle(todolistId:string, title:string) {
        return instanse.put<BaseResponseType>(`/todo-lists/${todolistId}`, {title  } )

    }
}

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type BaseResponseType<T = {} > = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T
}
