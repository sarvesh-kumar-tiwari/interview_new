import './App.css';
import React, { useState } from 'react';

function App() {
  const [newTaks, setNewTaks] = useState('');
  const [taskList, setTaskList] = useState([]);

  const addTaks = () => {
    setTaskList([newTaks,...taskList]);
    setNewTaks('');
  };

  return (
    <div className="App">
      <input type="text" name="message" value={newTaks} onChange={(e) => setNewTaks(e.target.value)} />
      <button onClick={addTaks}>Add Task</button>
      <ul>
        {taskList.map((item, index) => {
          return <li key={index}>{item}</li>; 
        })}
      </ul>
    </div>
  );
}

export default App;
