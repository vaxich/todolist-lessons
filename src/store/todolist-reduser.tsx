import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {todolistApi, TodolistApiType,} from "../api/todolist-api";

import {
     RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
} from "./app-reduser";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import { AppThunkType} from "./store";


export type TodolistActionType =
    | AddTodolistACType
    | RemoveTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | SetTodolistsACType
    | ChangeTodolistEntityStatusACType

export type RemoveTodolistACType= ReturnType<typeof removeTodolistAC>
export type AddTodolistACType= ReturnType<typeof addTodolistAC>
export type SetTodolistsACType= ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []



export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action:TodolistActionType ): Array<TodolistDomainType> => {
    switch(action.type) {
        case "SET-TODOLISTS":{
            return  action.todolists.map( (tl) => {
                return {...tl, filter: "all", entityStatus: 'idle'}
            })
        }

        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
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

export const addTodolistAC = (title: string) => ({type:"ADD-TODOLIST", title:title, todolistId: v1() }as const )
export const removeTodolistAC = (todolistId: string) => ({type:"REMOVE-TODOLIST",  todolistId} as const)
export const changeTodolistTitleAC = (todolistId: string, title:string) => ({type:"CHANGE-TODOLIST-TITLE", id: todolistId, title: title}as const)
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({type:"CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}as const)
export const setTodolistsAC = (todolists: Array<TodolistApiType>) => ({type:"SET-TODOLISTS", todolists }as const)
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({type:"CHANGE-TODOLIST-ENTITY-STATUS", todolistId, entityStatus }as const)


//Thunk
export const fetchTodolistsTC =(): AppThunkType =>  {
    return dispatch => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.getTodolists().
        then( (res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
    }
}
export const removeTodolistsTC =(todolistId : string): AppThunkType =>  {
    return (dispatch) => {
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
export const addTodolistsTC =(title : string): AppThunkType =>  {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodolist(title).
        then( (res) => {
            if (res.data.resultCode === 0){
                dispatch(addTodolistAC(res.data.data.item.title))
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

export const changeTodolistTitleTC =(todolistId:string, title : string): AppThunkType =>  {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.updateTodolistTitle(todolistId, title).
        then( (res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))

        })
    }
}