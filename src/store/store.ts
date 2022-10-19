
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {TasksActionType, tasksReducer} from './tasks-reduser';
import {TodolistActionType, todolistsReducer} from './todolist-reduser';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppReducerActionsType, setAppErrorActionType, setAppStatusActionType} from "./app-reduser";
import {useDispatch, useSelector} from "react-redux";
import {TypedUseSelectorHook} from "react-redux/es/types";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// все экшены для всего App
export type AppActionsType = TodolistActionType | TasksActionType | AppReducerActionsType

export type AppThunkType<ReturnType = void > = ThunkAction <ReturnType, AppRootStateType, unknown, AppActionsType >

type AppDispatch =ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;