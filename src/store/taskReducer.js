import { taskRemoved, taskUpdated } from './actionTypes';

export function taskReducer(state, action) {
  const { type, payload } = action;
  let newState = [...state];
  switch (type) {
    case taskUpdated:
      const elIdx = newState.findIndex((el) => el.id === payload.id);
      return (newState[elIdx] = { ...newState[elIdx], ...payload });
    case taskRemoved:
      return (newState = newState.filter((el) => el.id !== payload.id));
  }
}
