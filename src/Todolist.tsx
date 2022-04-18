import { Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemForm } from './addItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './editableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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
    changeFilter: (value: FilterValuesType, id: string) => void
    addTask: (title: string, id: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, id: string) => void
    changeTasksTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {


    const addTask = (title: string) => {
        props.addTask(title, props.todolistId);
    }



    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.todolistId)
    }

    return <div >
        <div>
            <Typography align={"center"} variant={"h3"}>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
                <IconButton onClick={() => props.removeTodolist(props.todolistId)}>
                    <DeleteForeverIcon />
                </IconButton>
                </Typography>
            <AddItemForm addItem={addTask} />

            <List>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
                        }
                        const changeTaskTitle = (newTitle: string) => {
                            props.changeTasksTitle(t.id, newTitle, props.todolistId);
                        }
                        return <ListItem
                            style={{ padding: "0" }}
                            key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                size={"small"}
                                color={"secondary"}
                                onChange={onChangeHandler}
                                checked={t.isDone} />
                            {/* <span>{t.title}</span> */}
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                            <IconButton onClick={onClickHandler}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
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
}
