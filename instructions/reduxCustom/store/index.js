import createStore from './createStore';
import configureStore from './store';
import taskReducer, { taskCompleted, titleChanged, taskDeleted } from './task';

export {
  configureStore,
  createStore,
  taskReducer,
  taskCompleted,
  titleChanged,
  taskDeleted,
};
