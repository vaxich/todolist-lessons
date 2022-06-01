import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, ChangeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './store/todolist-reduser';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer } from './store/tasks-reduser';
import { todolistId_1, todolistId_2 } from './AppWithRedux';

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

function AppWithReduser() {
    //  const todolistId_1 = v1();
    //   const todolistId_2 = v1();

    const [todolists, dispatchToTodolists] = useReducer( todolistsReducer, [
        { id: todolistId_1, title: "What learn", filter: "all" },
        { id: todolistId_2, title: "What to buy", filter: "all" }
    ])

    const [tasks, dispatchToTasks] = useReducer( tasksReducer, {
        [todolistId_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: "сахар", isDone: true },
            { id: v1(), title: "соль", isDone: true },
            { id: v1(), title: "молоко", isDone: false },
            { id: v1(), title: "хлеб", isDone: false },
            { id: v1(), title: "масло", isDone: false },
        ]
    })





    function removeTask(taskId: string, todolistId: string) {
        dispatchToTasks(removeTasksAC(taskId, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId));
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId));
    }
    function changeTasksTitle(taskId: string, title: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId));
    }
    function changeTodolistFilter(todolistId: string,filter: FilterValuesType, ) {
        
        dispatchToTodolists(ChangeTodolistFilterAC( todolistId ,filter));
    }
    function changeTodolistTitle(todolistId: string, title: string) {
        
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title));
    }
    function removeTodolist(todolistId: string) {
        let action = removeTodolistAC( todolistId)
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }
    function addTodolist(title: string) {
        let action = addTodolistAC( title)
        dispatchToTodolists(action);
        dispatchToTasks(action);
    }

    const todolistComponents = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        console.log(tasksForTodolist)

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }
        return (
            <Grid item key={tl.id}>
            <Paper elevation={8} style={{ padding: "20px", maxWidth: "300px" }}>
                <Todolist
                    
                    todolistId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
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

export default AppWithReduser;
function id(id: any): import("./store/todolist-reduser").AddTodolistAT | import("./store/todolist-reduser").RemoveTodolistAT | { type: "CHANGE-TODOLIST-TITLE"; title: string; id: string; } | { type: "CHANGE-TODOLIST-FILTER"; id: string; filter: import("./App").FilterValuesType; } {
    throw new Error('Function not implemented.');
}

