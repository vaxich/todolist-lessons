
import {TaskStateType} from "../AppWithRedux";
import {Dispatch} from "redux";
import { todolistApi} from "../api/todolist-api";
import {TaskType} from "../Todolist";
import {AppRootStateType, AppThunkType} from "./store";
import {setAppStatusAC, setAppStatusActionType} from "./app-reduser";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolist-reduser";



export type TasksActionType = ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistACType
    | RemoveTodolistACType
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>



const initialState: TaskStateType = {}


export const tasksReducer = (state = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach((tl) => {
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
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone }: task)

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

export const removeTasksAC = (taskId: string, todolistId:string) => ({type:"REMOVE-TASK", taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task:TaskType) => ({type:"ADD-TASK", task} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone:boolean ) => ({type:"CHANGE-TASK-STATUS",taskId, isDone, todolistId} as const)
export const changeTaskTitleAC = (todolistId: string, taskId:string, title:string) => ({type:"CHANGE-TASK-TITLE",todolistId, taskId, title} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>)=> ( {type:"SET-TASKS", todolistId, tasks} as const)

// export type setTasksActionType = ReturnType<typeof setTasksAC>

//thunk
export const fetchTasksTC = (todolistId: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTasks(todolistId)
        .then( (res) => {
            const tasks = res.data.items

            dispatch(setTasksAC(todolistId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTaskTC = (todolistId: string, taskId:string): AppThunkType => dispatch=>{
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTask(todolistId, taskId)
        .then( (res) => {
            if(res.data.resultCode === 0){
                dispatch(removeTasksAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            }

        })
}

enum ResponseStatuse {
    'success' = 0,
    'error' = 1,
    'captcha' = 10
}


export const addTaskTC = (todolistId: string): AppThunkType => dispatch=>{
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTask(todolistId)
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
export const updateTaskStarusTC = (todolistId:string, taskId:string, isDone:boolean) => (dispatch: Dispatch<TasksActionType>, getState: ()=>AppRootStateType) => {
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