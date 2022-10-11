import { v1 } from "uuid";
import { FilterValuesType, todolistType } from "../App";
import { todolistId_1, todolistId_2 } from "../AppWithRedux";
import {BaseResponseType, todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
    AppActionsType, RequestStatusType,
    setAppErrorAC,
    setAppErrorActionType,
    setAppStatusAC,
    setAppStatusActionType
} from "./app-reduser";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {TaskType} from "../Todolist";

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
    type: "SET-TODOLISTS"
    todolists: Array<TodolistType>

}

export type changeTodolistEntityStatusType = {
    type: "CHANGE-TODOLIST-ENTITY-STATUS"
    todolistId: string
    entityStatus: RequestStatusType

}


type ActionType = AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistTitleType
    | ChangeTodolistFilter
    | SetTodolistsType
    | AppActionsType
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,

}

const initialState: Array<TodolistDomainType> = []



export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action:ActionType ): Array<TodolistDomainType> => {
    switch(action.type) {
        case "SET-TODOLISTS":{


            return  action.todolists.map( (tl) => {
                return {...tl, filter: "all", entityStatus: 'idle'}

            })

        }

        case "ADD-TODOLIST":

            const newTodolist: todolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all",
                entityStatus: 'idle'
            }
            return [newTodolist, ...state ]
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id !== action.id
                ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id == action.id
                 ? {...tl, filter: action.filter}
                 : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id == action.todolistId
                ? {...tl, entityStatus: action.entityStatus}
                : tl)
        default:
            return state          
    }
}

export const addTodolistAC = (title: string):AddTodolistAT => ({type:"ADD-TODOLIST", title:title, todolistId: v1() })
export const removeTodolistAC = (todolistId: string):RemoveTodolistAT => ({type:"REMOVE-TODOLIST",  todolistId})
export const changeTodolistTitleAC = (todolistId: string, title:string):ChangeTodolistTitleType => ({type:"CHANGE-TODOLIST-TITLE", id: todolistId, title: title})
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilter => ({type:"CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter})
export const setTodolistsAC = (todolists: Array<TodolistType>):SetTodolistsType => ({type:"SET-TODOLISTS", todolists })
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType):changeTodolistEntityStatusType => ({type:"CHANGE-TODOLIST-ENTITY-STATUS", todolistId, entityStatus })

// type SetTodolistsType = ReturnType<typeof setTodolistsAC>

//Thunk
export const fetchTodolistsTC =() =>  {
    return (dispatch:Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.getTodolists().
        then( (res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
    }
}
export const removeTodolistsTC =(todolistId : string) =>  {
    return (dispatch:Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistApi.deleteTodolist(todolistId).
            then( (res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('some error'))
                    }

                    dispatch(setAppStatusAC('failed'))
                }


        })
    }
}
export const addTodolistsTC =(title : string) =>  {
    return (dispatch:Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodolist(title).
        then( (res) => {
            if (res.data.resultCode === 0){
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch,res.data)

            }

        })
        .catch( (err:AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
                //dispatch(setAppErrorAC(err.message))
                //dispatch(setAppStatusAC('failed'))
            })
    }
}

export const changeTodolistTitleTC =(todolistId:string, title : string) =>  {
    return (dispatch:Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.updateTodolistTitle(todolistId, title).
        then( (res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))

        })
    }
}