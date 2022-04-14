import React, { ChangeEvent, useState } from "react";
type EditableSpanPropsType = {
    title:string
    changeTitle:(title:string) =>void
}

export const EditableSpan =(props:EditableSpanPropsType) => {
    const [editMode, setEditMode]=useState<boolean>(false);
    const [title, setTitle] = useState(props.title);
    const onEditMode =() => {
        setEditMode(true);
    }
    const offEditMode =() => {
        setEditMode(false);
        props.changeTitle(title)
    }
    const onChangeHandler =(event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return(
        editMode ? 
        <input 
        value={title} 
        onBlur={offEditMode} 
        autoFocus
        onChange={onChangeHandler}
        /> :
         <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}