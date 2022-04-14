import React, { useState , KeyboardEvent, ChangeEvent} from "react";
type addItemFormPropsType = {
    addItem:(title:string) => void
}

export const AddItemForm = (props:addItemFormPropsType) => {
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
        setError(null);
        if (e.key === "Enter") {
            addItem();
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <div>
                <input value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addItem}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
}