import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import ToDoList from './components/ToDoList';
import tasksService from './services/taskService';
import papeleraCerrada from'./assets/papelera_blanca2.png';
import InProgressList from './components/InProgressList';
import DoneList from './components/DoneList';

function App() {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#31d2f2");

  useEffect(() => {
    tasksService.getAllToDoTasks().then(result => setTasksToDo(result))
    .catch(error => console.log('error', error));

    tasksService.getAllInProgressTasks().then(result => setTasksInProgress(result))
    .catch(error => console.log('error', error));

    tasksService.getAllDoneTasks().then(result => setTasksDone(result))
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
    if(description.trim() != "") {
      const newTask = {
        id: uuidv4(),
        description: description,
        backgroundColor: backgroundColor
      }
      tasksService.createTask(newTask);
      let taskToDoCopy = [...tasksToDo];
      taskToDoCopy.push(newTask);
      setTasksToDo(taskToDoCopy);
    }
  }

  const drop = (event) => {
    console.log();
  }

  const allowDrop = (event) => {

  }

  const closeTrash = () => {

  }


  return (
    <>
      <div className="container-fluid">
        {/**Header */}
        <div className="row">
          <div className="col-12 col-lg-12 p-3 ps-4" id='header'>
            <h2>Valki Kanban App</h2>
          </div>
        </div>
        {/**Menu */}
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-lg-12 m-5 d-flex justify-content-center align-items-center">
              <div>
                <input type="text" className='form-control me-3' id='descriptionInput' placeholder='Escribe algo...' value={description} onChange={() => handleSetDescription(event)} />
              </div>
              <div>
                <input type="color" className='form-control me-3' id='colorInput' value={backgroundColor} onChange={() => handleSetBackgroundColor(event)} />
              </div>
              <div>
                <button className='btn btn-info me-5' onClick={addTask}>Agregar nota</button>
              </div>
              <div onDrop={() => drop(event)} onDragOver={() => allowDrop(event)} onDragLeave={closeTrash} >
                <img src={papeleraCerrada} alt="Icono no disponible" width={70} />
              </div>
            </div>
          </div>
          <div className="row">
            {/**To do tasks */}
            <div className="col-12 col-lg-4">
              <h3 className='text-center tittle'>Por hacer</h3>
              <hr />
              <div className='delimiter'>
                <ToDoList tasksToDo={tasksToDo} setTasksToDo={setTasksToDo}></ToDoList>
              </div>
            </div>

            {/**In progress tasks */}
            <div className="col-12 col-lg-4">
              <h3 className='text-center tittle'>En progreso</h3>
              <hr />
              <div className='delimiter'>
                <InProgressList tasksInProgress={tasksInProgress} setTasksInProgress={setTasksInProgress} ></InProgressList>
              </div>
            </div>

            {/**Done tasks */}
            <div className="col-12 col-lg-4">
              <h3 className='text-center tittle'>Hecho</h3>
              <hr />
              <div>
                <DoneList tasksDone={tasksDone} setTasksDone={setTasksDone} ></DoneList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
