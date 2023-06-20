import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { logger } from './middleware/logger';
import errorReducer from './errors';
import taskReducer from './task';

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export default createStore;
