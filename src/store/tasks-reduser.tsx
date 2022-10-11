import {v1} from "uuid";
import {TaskStateType} from "../App";
import {todolistId_1, todolistId_2} from "../AppWithRedux";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsType} from "./todolist-reduser";
import {Dispatch} from "redux";
import {BaseResponseType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {TaskType} from "../Todolist";
import {AppRootStateType} from "./store";
import {AppActionsType, setAppErrorAC, setAppStatusAC, setAppStatusActionType} from "./app-reduser";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTasksActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string

}
export type addTaskActionType = {
    type: "ADD-TASK",
    task: TaskType

}
export type changeStatusTaskActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todolistId: string

}
export type changeTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    taskId: string
    title: string

}
export type setTasksActionType = {
    type: "SET-TASKS",
    todolistId: string,
    tasks: Array<TaskStateType>

}


export type ActionType = RemoveTasksActionType
    | addTaskActionType
    | changeStatusTaskActionType
    | changeTitleTaskActionType
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsType
    | setTasksActionType
    | setAppStatusActionType
    | AppActionsType

const initialState: TaskStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TODOS": {
            let copyState = {...state}
            action.todos.forEach((tl) => {
                    copyState[tl.id] = []
                }
            )
            return copyState
        }
        case "SET-TASKS": {

            return {...state, [action.todolistId]: action.tasks}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }

        case "ADD-TASK": {

            const stateCopy = {...state}
            const tasks = stateCopy[action.task.id]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.id] = newTasks
            return stateCopy
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
export const addTaskAC = (task:TaskType):addTaskActionType => ({type:"ADD-TASK", task} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone:boolean, ):changeStatusTaskActionType => ({type:"CHANGE-TASK-STATUS",taskId, isDone, todolistId})
export const changeTaskTitleAC = (todolistId: string, taskId:string, title:string):changeTitleTaskActionType => ({type:"CHANGE-TASK-TITLE",todolistId, taskId, title})
export const setTasksAC = (todolistId: string, tasks: Array<TaskStateType>)=> ( {type:"SET-TASKS", todolistId, tasks} as const)

// export type setTasksActionType = ReturnType<typeof  setTasksAC>

//thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>):void => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTasks(todolistId)
        .then( (res) => {
            const tasks = res.data.items

            dispatch(setTasksAC(todolistId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todolistId: string, taskId:string) => (dispatch: Dispatch<ActionType>)=>{
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTask(todolistId, taskId)
        .then( (res) => {
            const tasks = res.data.items
            const action = removeTasksAC(todolistId, tasks)

            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
}

enum ResponseStatuse {
    'success' = 0,
    'error' = 1,
    'captcha' = 10
}


export const addTaskTC = (todolistId: string, title:string) => (dispatch: Dispatch<ActionType>)=>{
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTask(todolistId, title)
        .then( (res)=> {
            if (res.data.resultCode === ResponseStatuse.success ) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }

        })
        .catch( (err:AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })

}
export const updateTaskStarusTC = (todolistId:string, taskId:string, isDone:boolean) => (dispatch: Dispatch<ActionType>, getState: ()=>AppRootStateType) => {
    const state = getState()
    const tasks = state.tasks
    const tasksForCurrentTodolist = tasks[todolistId]
    const currentTask:any = tasksForCurrentTodolist.find( (el)=> {
        return el.id === taskId
    })
     // const model:any = {...currentTask, status:status}

     if (currentTask) {
         todolistApi.updateTask(todolistId, taskId, {
             status: isDone,
             title: currentTask.title,
             startDate: currentTask.startDate,
             priority: currentTask.priority,
             descroption:currentTask.description,
             deadLine: currentTask.dead_code


         })
             .then((res) => {
                 const action = changeTaskStatusAC(todolistId, taskId, isDone)
                 dispatch(action)
             })
     }


}