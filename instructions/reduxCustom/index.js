import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore, taskCompleted, taskDeleted, titleChanged } from './store';

export const store = configureStore();

const App = () => {
  const [state, getState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      getState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>Title: {el.title}</p>
            <p>completed: {`${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr></hr>
          </li>
        ))}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
