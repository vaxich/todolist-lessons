import { v1 } from "uuid";
import { FilterValuesType, todolistType } from "../App";
import { todolistId_1, todolistId_2 } from "../AppWithRedux";

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


type ActionType = AddTodolistAT | RemoveTodolistAT | ChangeTodolistTitleType | ChangeTodolistFilter
 
const initialState: Array<todolistType> = []



export const todolistsReducer = (state = initialState, action:ActionType ): Array<todolistType> => {
    switch(action.type) {
        case "ADD-TODOLIST":
            
            const newTodolist: todolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
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
        default:
            return state          
    }
}

export const addTodolistAC = (title: string):AddTodolistAT => ({type:"ADD-TODOLIST", title:title, todolistId: v1() })
export const removeTodolistAC = (todolistId: string):RemoveTodolistAT => ({type:"REMOVE-TODOLIST",  todolistId})
export const changeTodolistTitleAC = (todolistId: string, title:string):ChangeTodolistTitleType => ({type:"CHANGE-TODOLIST-TITLE", id: todolistId, title: title})
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType):ChangeTodolistFilter => ({type:"CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter})