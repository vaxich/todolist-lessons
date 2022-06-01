import { Checkbox, IconButton, ListItem } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { EditableSpan } from './editableSpan';
import { TaskType } from './Todolist';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskPropsType = {
    task: TaskType
    
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTasksTitle: (taskId: string, newTitle:string) => void
}   

export const Task = React.memo(({ task, removeTask, changeTaskStatus, changeTasksTitle }: TaskPropsType) => {

    const onClickHandler =useCallback ( () => removeTask(task.id), [removeTask, task.id])
    const onChangeHandler =useCallback ( (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue);
    }, [changeTaskStatus, task.id])
    const changeTaskTitle =useCallback ( (newTitle: string) => {
        changeTasksTitle(task.id, newTitle);
    }, [changeTasksTitle, task.id])
    return (
        <div>
            <div> <ListItem
                style={{ padding: "0" }}
                
                className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    size={"small"}
                    color={"secondary"}
                    onChange={onChangeHandler}
                    checked={task.isDone} />
                {/* <span>{t.title}</span> */}
                <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                <IconButton onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>
            </div>
        </div>
    )
})