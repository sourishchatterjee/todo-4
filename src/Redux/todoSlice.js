


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//     { id: 1, title: "play football", completed: false, image: "" },
//     { id: 2, title: "play cricket", completed: true, image: "" },
//     { id: 3, title: "play guitar", completed: false, image: "" }
// ];

// const todoSlice = createSlice({
//     name: "Todo",
//     initialState,
//     reducers: {
//         addTodo: (state, action) => {
//             const { id, title, completed, image } = action.payload;
//             state.push({ id, title, completed, image });
//         },
//         removeTodo: (state, action) => {
//             return state.filter(todo => todo.id !== action.payload);
//         },
//         toggleTodo: (state, action) => {
//             const todo = state.find(todo => todo.id === action.payload);
//             if (todo) {
//                 todo.completed = !todo.completed;
//             }
//         },
//         editTodo: (state, action) => {
//             const { id, title, image } = action.payload;
//             const todo = state.find(todo => todo.id === id);
//             if (todo) {
//                 todo.title = title;
//                 todo.image = image;
//             }
//         }
//     }
// });

// export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions;
// export default todoSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const { id, title, image, date } = action.payload;
      const todoIndex = state.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex] = { ...state[todoIndex], title, image, date };
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
