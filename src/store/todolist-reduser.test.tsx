
import { v1 } from 'uuid';
import { todolistType } from '../App';
import { addTodolistAC, todolistsReducer } from './todolist-reduser';

let todolistId1: string
let todolistId2: string

let startState: Array<todolistType> 

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ]
});


test('correct todolist should be removed', () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[1].id).toBe(todolistId2);
});
