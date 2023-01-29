import { useState, useEffect } from 'react'
import './App.css'
import ToDoList from './components/ToDoList';
import tasksService from './services/taskService';

function App() {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    tasksService.getAllToDoTasks().then(result => setTasksToDo(result))
    .catch(error => console.log('error', error));

    return () => {}
  }, [])

  const handleSetDescription = (event) => {
    let newDescription = event.target.value;
    setDescription(newDescription)
  }

  const handleSetBackgroundColor = (event) => {
    let newBackgroundColor = event.target.value;
    setBackgroundColor(newBackgroundColor)
  }

  const addTask = () => {

  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 p-3 ps-4" id='header'>
            <h2>Valki Kanban App</h2>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-lg-12 m-5 d-flex justify-content-center">
              <div>
                <input type="text" className='form-control me-3' id='descriptionInput' placeholder='Escribe algo...' value={description} onChange={() => handleSetDescription(event)} />
              </div>
              <div>
                <input type="color" className='form-control me-3' id='colorInput' value={backgroundColor} onChange={() => handleSetBackgroundColor(event)} />
              </div>
              <div>
                <button className='btn btn-info' onClick={addTask}>Agregar nota</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4">
              <h3 className='text-center tittle'>Por hacer</h3>
              <hr />
              <div className='delimiter'>
                <ToDoList tasksToDo={tasksToDo} setTasksToDo={setTasksToDo}></ToDoList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
