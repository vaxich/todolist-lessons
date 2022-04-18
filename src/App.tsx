import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = "all" | "active" | "completed";
type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
    //tasks:Array<TaskType>

}

type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    const todolistId_1 = v1();
    const todolistId_2 = v1();

    const [todolists, setTodolists] = useState<Array<todolistType>>([
        { id: todolistId_1, title: "What learn", filter: "all" },
        { id: todolistId_2, title: "What to buy", filter: "all" }
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        const tasksFromTodolist = tasks[todolistId]
        const filteredTasks = tasksFromTodolist.filter(t => t.id !== taskId);
        const copyTasks = { ...tasks }
        copyTasks[todolistId] = filteredTasks
        setTasks(copyTasks);
    }

    function addTask(title: string, todolistId: string) {
        const newTask = { id: v1(), title: title, isDone: false }
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(t => t.id === taskId ? { ...t, isDone } : t)
        })
    }
    function changeTasksTitle(taskId: string, title: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(
                t => t.id === taskId ? { ...t, title } : t
            )
        })
    }
    function changeTodolistFilter(filter: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
    }
    function changeTodolistTitle(title: string, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl))
    }
    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasks = { ...tasks }
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }
    function addTodolist(title: string) {
        const newTodolistId = v1();
        const newTodolist: todolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodolist]);
        setTasks({ ...tasks, [newTodolistId]: [] });
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

export default App;
