import {v1} from "uuid";
import {TaskStateType} from "../App";
import {todolistId_1, todolistId_2} from "../AppWithRedux";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsType} from "./todolist-reduser";
import {Dispatch} from "redux";
import {todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {TaskType} from "../Todolist";
import {AppRootStateType} from "./store";

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
    id: string
    isDone: boolean
    todolistId: string

}
export type changeTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistId: string
    id: string
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
            let copyState = {...state}
            copyState[action.tasks.todolistId] = action.tasks
            return copyState
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
export const addTaskAC = (task:TaskType):addTaskActionType => ({type:"ADD-TASK", task})
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone:boolean, ):changeStatusTaskActionType => ({type:"CHANGE-TASK-STATUS",id, isDone, todolistId})
export const changeTaskTitleAC = (todolistId: string, id:string, title:string):changeTitleTaskActionType => ({type:"CHANGE-TASK-TITLE",todolistId, id, title})
// export const setTasksAC = (todoId: string, tasks: Array<TaskStateType>)=> ( {type:"SET-TASKS", todoId, tasks} as const)

// export type setTasksActionType = ReturnType<typeof  setTasksAC>

//thunk
// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch):void => {
//     todolistApi.getTasks(todolistId)
//         .then( (res) => {
//             const tasks = res.data.data.items
//             dispatch(setTasksAC(todolistId, tasks))
//         })
// }
// export const addTaskTC = (todolistId: string, taskTitle:string) => (dispatch: Dispatch)=>{
//     todolistApi.createTask(todolistId, taskTitle)
//         .then( (res)=> {
//             const task = res.data.data.item
//             dispatch(addTaskAC(task))
//         })
// }
export const updateTaskStarusTC = (todolistId:string, taskId:string, isDone:boolean) => (dispatch: Dispatch, getState: ()=>AppRootStateType) => {
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