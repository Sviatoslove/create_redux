import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  changeTitle,
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  getTasksLoadingStatus,
  loadTasks,
} from './store/task';
import createStore from './store/store';
import { getError } from './store/errors';

export const store = createStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTask())}>
        Добавить рандомную задачу
      </button>
      <hr></hr>
      <ul>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          state.map((el) => (
            <li key={el.id}>
              <p>Title: {el.title}</p>
              <p>completed: {`${el.completed}`}</p>
              <button onClick={() => dispatch(completeTask(el.id))}>
                Complete
              </button>
              <button onClick={() => dispatch(changeTitle(el.id))}>
                Change title
              </button>
              <button onClick={() => dispatch(deleteTask(el.id))}>
                Delete
              </button>
              <hr></hr>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
