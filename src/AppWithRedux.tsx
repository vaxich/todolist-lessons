import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import CircularProgress from  '@mui/material/CircularProgress/CircularProgress'
import { Menu } from '@mui/icons-material';
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    changeTodolistTitleAC,  removeTodolistAC,
    setTodolistsAC, fetchTodolistsTC,
    todolistsReducer
} from './store/todolist-reduser';
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
    tasksReducer, updateTaskStarusTC
} from './store/tasks-reduser';
import {AppRootStateType, useAppSelector} from './store/store';
import { useDispatch, useSelector } from 'react-redux';

import {todolistApi} from "./api/todolist-api";
import {RequestStatusType} from "./store/app-reduser";
import {ErrorSnackbar} from "./ErrorSnakbar/ErrorSnakbar";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
    //tasks:Array<TaskType>

}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

export const todolistId_1 = v1();
export const todolistId_2 = v1(); 

function AppWithRedux() {

    useEffect( ()=> {
        dispatch(fetchTodolistsTC)
    }, [])


    let todolists = useSelector<AppRootStateType, Array<todolistType>>(state => state.todolists)
    console.log(todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    //let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let status = useAppSelector< RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()




    const removeTask =useCallback ((taskId: string, todolistId: string) =>{
        dispatch(removeTasksAC( todolistId, taskId));
    },[dispatch])

    const addTask = useCallback ((title: string, todolistId: string) => {

        dispatch(addTaskTC(todolistId, title ));
    }, [dispatch] )

    const changeTaskStatus =useCallback ( (taskId: string, isDone: boolean, todolistId: string) =>{
        dispatch(updateTaskStarusTC(todolistId, taskId, isDone ));
    }, [dispatch])
    const changeTasksTitle =useCallback ( (taskId: string, title: string, todolistId: string) =>{
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    }, [dispatch])
    const changeTodolistFilter =useCallback ( (todolistId: string,filter: FilterValuesType, ) =>{
        
        dispatch(ChangeTodolistFilterAC( todolistId ,filter));
    }, [dispatch])
    const changeTodolistTitle =useCallback ( (todolistId: string, title: string) =>{
        
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch])
    const removeTodolist = useCallback ((todolistId: string) =>{
        let action = removeTodolistAC( todolistId)
        dispatch(action);
        
    }, [dispatch])
    const addTodolist = useCallback ((title: string) =>{
        let action = addTodolistAC( title)
        dispatch(action);
        
    }, [dispatch])

    const todolistComponents = todolists.map(tl => {
        
        return (
            <Grid item key={tl.id}>
            <Paper elevation={8} style={{ padding: "20px", maxWidth: "300px" }}>
                <Todolist

                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                     tasks={tasks[tl.id]}
                    entityStatus={tl.entityStatus}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTasksTitle={changeTasksTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />

            </Paper>
            </Grid>
        )
    })






    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton edge="start" color="inherit" aria-label='menu'>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color='inherit' variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            { status === 'loading' && <CircularProgress color="secondary" /> }
            <Container fixed>
                <Grid container justifyContent={"center"}>
                    <div>
                        <AddItemForm addItem={addTodolist} />
                    </div>
                    </Grid >
                    <Grid container spacing={6} justifyContent={"center"}>
                        {todolistComponents}
                    </Grid>
            </Container>
            <ErrorSnackbar />
        </div>

    );
}

export default AppWithRedux;


