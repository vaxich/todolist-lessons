import { v1 } from "uuid";
import { FilterValuesType, todolistType } from "../App";

type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}
type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
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

export const todolistsReducer = (todolists: Array<todolistType>, action:ActionType ): Array<todolistType> => {
    switch(action.type) {
        case "ADD-TODOLIST":
            const newTodolistId = v1();
            const newTodolist: todolistType = {
                id: newTodolistId,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodolist]
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id !== action.id 
                ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id !== action.id
                 ? {...tl, filter: action.filter}
                 : tl)
        default:
            return todolists          
    }
}

export const addTodolistAC = (title: string):AddTodolistAT => ({type:"ADD-TODOLIST", title:title})
export const removeTodolistAC = (id: string):RemoveTodolistAT => ({type:"REMOVE-TODOLIST", id: id})
export const changeTodolistTitleAC = (id: string, title:string):ChangeTodolistTitleType => ({type:"CHANGE-TODOLIST-TITLE", id: id, title: title})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType):ChangeTodolistFilter => ({type:"CHANGE-TODOLIST-FILTER", id: id, filter: filter})