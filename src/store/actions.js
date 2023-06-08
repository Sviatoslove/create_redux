import { store } from '..';
import * as actionTypes from './actionTypes';

export const taskCompleted = (id) => {
  return {
    type: actionTypes.taskUpdated,
    payload: { id, completed: true },
  };
};

export const titleChanged = (id) => {
  return {
    type: actionTypes.taskUpdated,
    payload: {
      id,
      title: `New title for ${store.getState()[id - 1].title}`,
    },
  };
};

export const taskDeleted = (id) => {
  return {
    type: actionTypes.taskRemoved,
    payload: {
      id,
    },
  };
};
