import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../store/app-reduser";
import {Dispatch} from "redux";
import {BaseResponseType} from "../api/todolist-api";





export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, message:string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = (dispatch: Dispatch<AppActionsType>, data:BaseResponseType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }

    dispatch(setAppStatusAC('failed'))
}