import { TaskStateType, todolistType } from "../App";
import { tasksReducer } from "./tasks-reduser";
import { addTodolistAC, todolistsReducer } from "./todolist-reduser";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<todolistType> = [];
 
    const action = addTodolistAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
 });
 