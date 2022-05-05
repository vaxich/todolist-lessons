import { v1 } from "uuid";
import { TaskStateType } from "../App";

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



export type ActionType = RemoveTasksActionType | addTaskActionType

export const tasksReducer = (state: TaskStateType, action:ActionType ): TaskStateType => {
    switch(action.type) {
        case "REMOVE-TASK": {
            return {
                ...state, 
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
           
        case "ADD-TASK": {
            let newTask = { id: "0", title: action.title, isDone: false }
            return {
                ...state,
                [action.todolistId]:[newTask, ...state[action.todolistId]]
                
            }
        }
            
        
        default:
            return state         
    }
}

export const removeTasksAC = (taskId: string, todolistId:string):RemoveTasksActionType => ({type:"REMOVE-TASK", taskId: taskId, todolistId: todolistId})
export const addTaskAC = (title: string, todolistId: string):addTaskActionType => ({type:"ADD-TASK", title, todolistId})
