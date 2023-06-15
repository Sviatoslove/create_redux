import { createSlice } from '@reduxjs/toolkit';
import { store } from '..';
import todosService from '../services/todos.service';
import { setError } from './errors';

export const initialState = { entities: [], isLoading: true, error: null };

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elIdx = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elIdx] = { ...state.entities[elIdx], ...action.payload };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: taskReducer, actions } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed } = actions;

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export const titleChanged = (id) => {
  return update({
    id,
    title: `New title for ${store.getState().entities[id - 1].title}`,
  });
};

export const taskRemove = (id) => {
  return remove({ id });
};

export default taskReducer;
