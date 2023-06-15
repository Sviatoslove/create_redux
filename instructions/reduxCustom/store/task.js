import { store } from '..';

const TASK_UPDATED = 'task/updated';
const TASK_DELETED = 'task/deleted';

export const taskCompleted = (id) => {
  return {
    type: TASK_UPDATED,
    payload: { id, completed: true },
  };
};

export const titleChanged = (id) => {
  return {
    type: TASK_UPDATED,
    payload: {
      id,
      title: `New title for ${store.getState()[id - 1].title}`,
    },
  };
};

export const taskDeleted = (id) => {
  return {
    type: TASK_DELETED,
    payload: {
      id,
    },
  };
};

function taskReducer(state, action) {
  const { type, payload } = action;
  let newState = [...state];
  switch (type) {
    case TASK_UPDATED:
      const elIdx = newState.findIndex((el) => el.id === payload.id);
      newState[elIdx] = { ...newState[elIdx], ...payload };
      return newState;
    case TASK_DELETED:
      return newState.filter((el) => el.id !== payload.id);
  }
}

export default taskReducer;
