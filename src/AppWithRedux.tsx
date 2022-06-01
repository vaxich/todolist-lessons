import React, { useCallback, useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, ChangeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './store/todolist-reduser';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer } from './store/tasks-reduser';
import { AppRootStateType } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Todolist1 } from './Todolist1';

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
    

    let todolists = useSelector<AppRootStateType, Array<todolistType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    
    const dispatch = useDispatch()




    const removeTask =useCallback ((taskId: string, todolistId: string) =>{
        dispatch(removeTasksAC(taskId, todolistId));
    },[dispatch])

    const addTask = useCallback ((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }, [dispatch] )

    const changeTaskStatus =useCallback ( (taskId: string, isDone: boolean, todolistId: string) =>{
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
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
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolist={removeTodolist}
                    changeTasksTitle={changeTasksTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
                {/* <Todolist1 
                    key = {tl.id}
                    todolist = {tl}
                /> */}
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
        </div>

    );
}

export default AppWithRedux;


