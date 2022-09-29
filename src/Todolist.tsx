import { Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography } from '@mui/material';
import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from 'react';
import { AddItemForm } from './addItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './editableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Task } from './Task';
import {fetchTasksTC} from "./store/tasks-reduser";
import {useDispatch} from "react-redux";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, id: string) => void
    changeFilter: (id: string, value: FilterValuesType) => void
    addTask: (title: string, id: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, id: string) => void
    changeTasksTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()

    useEffect( ()=> {
        dispatch(fetchTasksTC(props.todolistId));
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId);
    }, [props.addTask, props.todolistId])

    let tasksForTodolist = props.tasks;


    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, "all"), [props.changeFilter, props.todolistId]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, "active"), [props.changeFilter, props.todolistId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, "completed"), [props.changeFilter, props.todolistId]);

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }

    const removeTask = useCallback( (taskId:string)=> {
        props.removeTask(taskId, props.todolistId)
    }, [props.removeTask, props.todolistId])

    const removeTodolist = useCallback( (todolistId:string)=> {
        props.removeTodolist(props.todolistId)
    }, [props.removeTodolist, props.todolistId])

    const changeTaskStatus = useCallback( (taskId:string, newIsDoneValue: boolean) =>{
        props.changeTaskStatus(taskId, newIsDoneValue, props.todolistId)
    }, [props.changeTaskStatus, props.todolistId])

    const changeTasksTitle = useCallback( (taskId:string, newTitle: string) =>{
        props.changeTasksTitle(taskId, newTitle, props.todolistId)
    }, [props.changeTasksTitle, props.todolistId])

    return <div >
        <div>
            <Typography align={"center"} variant={"h3"}>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <IconButton onClick={() => removeTodolist(props.todolistId)}>
                    <DeleteForeverIcon />
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask} />

            <List>
                {
                    tasksForTodolist.map(t => {
                        
                        return <Task
                            key={t.id}
                            task={t}
                            
                            removeTask={removeTask }
                            changeTaskStatus={ changeTaskStatus}
                            changeTasksTitle={ changeTasksTitle}
                        />
                    })
                }
            </List>
        </div>
        <div>
            <ButtonGroup
                fullWidth
                size={"small"}
                variant={"contained"}
                disableElevation
            >
                <Button
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>

    </div>
})
