import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { todolistId_1, todolistId_2 } from "../AppWithRedux";
import { AddTodolistAT, RemoveTodolistAT } from "./todolist-reduser";

export type RemoveTasksActionType = {
    type: "REMOVE-TASK",
    taskId:string,
    todolistId:string
    
}
export type addTaskActionType = {
    type: "ADD-TASK",
    title:string,
    todolistId:string
    
}
export type changeStatusTaskActionType = {
    type: "CHANGE-TASK-STATUS"
    id:string
    isDone:boolean
    todolistId:string
    
}
export type changeTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId:string
    id:string
    title: string
    
}



export type ActionType = RemoveTasksActionType 
| addTaskActionType
| changeStatusTaskActionType
| changeTitleTaskActionType 
| AddTodolistAT
| RemoveTodolistAT

const initialState : TaskStateType = {}


export const tasksReducer = (state = initialState, action:ActionType ): TaskStateType => {
    switch(action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, 
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
           
        case "ADD-TASK": {
            let newTask = { id: v1(), title: action.title, isDone: false }
            return {
                ...state,
                [action.todolistId]:[newTask, ...state[action.todolistId]]
                
            }
        }
        
        case "CHANGE-TASK-STATUS": {
            
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.id ? {...task, isDone: action.isDone }: task)
                
            }
        }
        case "CHANGE-TASK-TITLE": {
            
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.title === action.title ?  task : {...task, title: action.title })
                
            }
        }
        case "ADD-TODOLIST": {
            
            return {
                ...state, [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        
        default:
            return state         
    }
}

export const removeTasksAC = (taskId: string, todolistId:string):RemoveTasksActionType => ({type:"REMOVE-TASK", taskId: taskId, todolistId: todolistId})
export const addTaskAC = (title: string, todolistId: string):addTaskActionType => ({type:"ADD-TASK", title, todolistId})
export const changeTaskStatusAC = (id: string, isDone:boolean, todolistId: string):changeStatusTaskActionType => ({type:"CHANGE-TASK-STATUS",id, isDone, todolistId})
export const changeTaskTitleAC = (todolistId: string, id:string, title:string):changeTitleTaskActionType => ({type:"CHANGE-TASK-TITLE",todolistId, id, title})

