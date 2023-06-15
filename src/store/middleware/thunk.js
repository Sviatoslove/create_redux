export function thunk(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === 'function') {
        action(store.dispatch, store.getState);
      } else {
        return next(action);
      }
    };
  };
}
