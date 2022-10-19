import { IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState , KeyboardEvent, ChangeEvent} from "react";
import {RequestStatusType} from "./store/app-reduser";

type addItemFormPropsType = {
    addItem:(title:string) => void
    entityStatus?:RequestStatusType
}

export const AddItemForm = React.memo ( (props:addItemFormPropsType) => {
    let[title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error)setError(null);
        if (e.key === "Enter") {
            addItem();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div style={{display: "flex", alignItems:"center"}}>
            <div >
                <TextField 
                    variant={"outlined"}
                    label={"Title"}
                    size={"small"}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                    disabled={props.entityStatus === 'loading'}
                />
                <IconButton 
                size={"medium"}
                color={"primary"}
                onClick={addItem}
                disabled={props.entityStatus === 'loading'}
                >
                    <AddCircleIcon fontSize={"large"} />
                </IconButton>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
})