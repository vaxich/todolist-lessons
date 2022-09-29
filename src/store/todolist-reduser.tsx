import { v1 } from "uuid";
import { FilterValuesType, todolistType } from "../App";
import { todolistId_1, todolistId_2 } from "../AppWithRedux";
import {todolistApi, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string

}
export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
type ChangeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id:string
}
type ChangeTodolistFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    id:string
    filter: FilterValuesType
}
export type SetTodolistsType = {
    type: "SET-TODOS"
    todos: Array<TodoType>

}


type ActionType = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleType | ChangeTodolistFilter | SetTodolistsType
// export type TodolistDomainType = TodoType & {filter: FilterValuesType}

const initialState: Array<todolistType> = []



export const todolistsReducer = (state = initialState, action:ActionType ): Array<todolistType> => {
    switch(action.type) {
        case "SET-TODOS":{


            return  action.todos.map( (tl) => {
                return {...tl, filter: "all"}

            })

        }

        // case "ADD-TODOLIST":
        //
        //     const newTodolist: todolistType = {
        //         id: action.todolistId,
        //         title: action.title,
        //         filter: "all"
        //     }
        //     return [newTodolist, ...state ]
        // case "REMOVE-TODOLIST":
        //     return state.filter(tl => tl.id !== action.todolistId)
        // case "CHANGE-TODOLIST-TITLE":
        //     return state.map(tl => tl.id !== action.id
        //         ? { ...tl, title: action.title } : tl)
        // case "CHANGE-TODOLIST-FILTER":
        //     return state.map(tl => tl.id == action.id
        //          ? {...tl, filter: action.filter}
        //          : tl)
        default:
            return state          
    }
}

// export const addTodolistAC = (title: string):AddTodolistAT => ({type:"ADD-TODOLIST", title:title, todolistId: v1() })
// export const removeTodolistAC = (todolistId: string):RemoveTodolistAT => ({type:"REMOVE-TODOLIST",  todolistId})
// export const changeTodolistTitleAC = (todolistId: string, title:string):ChangeTodolistTitleType => ({type:"CHANGE-TODOLIST-TITLE", id: todolistId, title: title})
// export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilter => ({type:"CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter})
export const setTodolistsAC = (todos: Array<TodoType>):SetTodolistsType => ({type:"SET-TODOS", todos })

// type SetTodolistsType = ReturnType<typeof setTodolistsAC>

//Thunk
export const setTodosTC =() => (dispatch:Dispatch) => {
    //1.side effect
    todolistApi.getTodos().
    then( (res) => {
        let todos = res.data
        console.log(todos)
        //2. dispatch action
        dispatch(setTodolistsAC(todos))
    })


}
