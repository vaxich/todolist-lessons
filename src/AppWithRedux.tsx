import React, {useCallback, useEffect} from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import CircularProgress from  '@mui/material/CircularProgress/CircularProgress'
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    changeTodolistTitleAC,  removeTodolistAC,
     fetchTodolistsTC,

} from './store/todolist-reduser';
import {
    addTaskTC,
    changeTaskTitleAC,
    removeTasksAC,
     updateTaskStarusTC
} from './store/tasks-reduser';
import {AppRootStateType, useAppSelector, useAppDispatch} from './store/store';
import {RequestStatusType} from "./store/app-reduser";
import {ErrorSnackbar} from "./ErrorSnakbar/ErrorSnakbar";
import {Login} from "./Login/Login";
import  { Routes, Route, Navigate } from "react-router-dom"


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export const todolistId_1 = v1();
export const todolistId_2 = v1(); 

function AppWithRedux() {
    const dispatch = useAppDispatch()
    useEffect( ()=> {
        dispatch(fetchTodolistsTC())
    }, [])


    let todolists = useAppSelector(state => state.todolists)
    console.log(todolists)
    let tasks = useAppSelector(state => state.tasks)

    //let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let status = useAppSelector< RequestStatusType>(state => state.app.status)






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
                <Routes>
                    <Route path="/" element={<AppWithRedux />}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="404"  element={<h1 style={{textAlign: "center"}}>Page not found</h1>}/>
                    <Route path="*"  element={<Navigate to={"404"}/>}/>


                </Routes>

            </Container>
            <ErrorSnackbar />
        </div>

    );
}

export default AppWithRedux;


