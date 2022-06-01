import { Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddItemForm } from './addItemForm';
import { FilterValuesType, todolistType } from './App';
import { EditableSpan } from './editableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC } from './store/tasks-reduser';
import { ChangeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './store/todolist-reduser';
import { AppRootStateType } from './store/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: todolistType
}

export function Todolist1({todolist}: PropsType) {

    const {id, title, filter} = todolist

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }
    const removeTodolist = () => {
        dispatch( removeTodolistAC(id))
    }
   

    const onAllClickHandler = () =>  dispatch(ChangeTodolistFilterAC(id, "all"))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(id, "completed"))
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    return <div >
        <div>
            <Typography align={"center"} variant={"h3"}>
                <EditableSpan title={title} changeTitle={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <DeleteForeverIcon />
                </IconButton>
                </Typography>
            <AddItemForm addItem={addTask} />

            <List>
                {
                    tasks.map(t => {
                        const onClickHandler = () => dispatch(removeTasksAC(t.id, id));
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsdoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsdoneValue, id ));
                        }
                        const changeTaskTitle = (newTitle: string) => {
                            
                            dispatch(changeTaskTitleAC(t.id, newTitle, id ));
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
                    color={filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>

    </div>
}
