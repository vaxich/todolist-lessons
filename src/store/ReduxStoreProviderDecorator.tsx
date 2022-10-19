import React from "react"
import {Provider} from "react-redux"
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";
import { v1 } from "uuid";
import { AppRootStateType, store } from "./store"
import { tasksReducer } from "./tasks-reduser";
import { todolistsReducer } from "./todolist-reduser";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
 })
 
 const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",entityStatus: "idle" },
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
 };

//@ts-ignore
 export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));
 
 
 

export const ReduxStoreProviderDecorator = ( storyFn: any  ) => {
    return <Provider store={store}>{storyFn()}</Provider>
}