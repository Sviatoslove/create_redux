import { createSlice } from '@reduxjs/toolkit';
import { store } from '..';
import todosService from '../services/todos.service';
import { setError } from './errors';

export const initialState = { entities: [], isLoading: true };

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
    create(state, action) {
      state.entities.unshift(action.payload);
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { reducer: taskReducer, actions } = taskSlice;
const { update, remove, recived, create, taskRequested, taskRequestFailed } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());

  try {
    const data = await todosService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = () => async (dispatch) => {
  dispatch(taskRequested());

  try {
    const data = await todosService.create();
    dispatch(create(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export const changeTitle = (id) => (dispatch) => {
  dispatch(
    update({
      id,
      title: `New title for ${
        store.getState().tasks.entities.find((el) => el.id === id).title
      }`,
    })
  );
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(remove({ id }));
};

export const getTasks = () => (store) => store.tasks.entities;
export const getTasksLoadingStatus = () => (store) => store.tasks.IsLoading;

export default taskReducer;
