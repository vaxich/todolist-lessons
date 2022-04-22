
import {v1} from 'uuid';
import {todolistType} from '../App';
import { addTodolistAC, todolistsReducer } from './todolist-reduser';

test('correct todolist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newTodolistTitle = "New Todolist";

   const startState: Array<todolistType> = [
       {id: todolistId1, title: "What to learn", filter: "all"},
       {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});
