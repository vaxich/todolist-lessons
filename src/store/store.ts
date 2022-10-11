
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { tasksReducer } from './tasks-reduser';
import { todolistsReducer } from './todolist-reduser';
import thunk from "redux-thunk";
import {appReducer} from "./app-reduser";
import {useSelector} from "react-redux";
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


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;