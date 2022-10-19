

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as NullableType<string>
}



// status === 'loading' - крутилку показываем
// status === 'idle' | 'succeeded' | 'failed' - крутилку прячем

export type NullableType<T> = null | T

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error:action.error}
        default:
            return state
    }
}

export const  setAppStatusAC = (status: RequestStatusType ) => ({type: "APP/SET-STATUS", status} as const)
export const  setAppErrorAC = (error: NullableType<string> ) => ({type: "APP/SET-ERROR", error} as const)

export type AppReducerActionsType  = setAppStatusActionType | setAppErrorActionType
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>

