import { createAction, createReducer } from '@reduxjs/toolkit';
import { store } from '..';

export const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
];

const update = createAction('task/updated');
const remove = createAction('task/remove');

export const taskCompleted = (id) => {
  return update({ id, completed: true });
};

export const titleChanged = (id) => {
  return update({
    id,
    title: `New title for ${store.getState()[id - 1].title}`,
  });
};

export const taskRemove = (id) => {
  return remove({ id });
};

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elIdx = state.findIndex((el) => el.id === action.payload.id);
      state[elIdx] = { ...state[elIdx], ...action.payload };
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id);
    });
});

export default taskReducer;
