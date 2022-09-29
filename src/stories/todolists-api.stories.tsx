import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.getTodolists()
        .then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'react'

        todolistApi.createTodolist(title)
        .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todolistId = "25246ea9-e607-4a71-a34d-874cd4e04e3c"
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
        .then( (res)=> {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = "67bfa919-f71d-4452-ab22-237624379d9e"
        let title = "444"
        todolistApi.updateTodolistTitle(todolistId, title)
        .then( (res)=> {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
