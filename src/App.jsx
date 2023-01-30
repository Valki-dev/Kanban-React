import { useState, useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import ToDoList from './components/ToDoList';
import tasksService from './services/taskService';
import InProgressList from './components/InProgressList';
import DoneList from './components/DoneList';
import papeleraCerrada from './assets/papelera_blanca2.png';
import papeleraAbierta from './assets/papelera_blanca_abierta_2.png';
import taskService from './services/taskService';

function App() {
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#31d2f2");
  const [image, setImage] = useState(papeleraCerrada);

  useEffect(() => {
    tasksService.getAllToDoTasks().then(result => setTasksToDo(result))
      .catch(error => console.log('error', error));

    tasksService.getAllInProgressTasks().then(result => setTasksInProgress(result))
      .catch(error => console.log('error', error));

    tasksService.getAllDoneTasks().then(result => setTasksDone(result))
      .catch(error => console.log('error', error));

    return () => { }
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
    if (description.trim() != "") {
      const newTask = {
        id: uuidv4(),
        description: description,
        backgroundColor: backgroundColor
      }
      tasksService.addTask(newTask, "/toDoTasks");
      let taskToDoCopy = [...tasksToDo];
      taskToDoCopy.push(newTask);
      setTasksToDo(taskToDoCopy);
    }
  }

  const drop = (event) => {
    event.preventDefault();
    const task = JSON.parse(event.dataTransfer.getData("task"));

    let tasksToDoCopy = [...tasksToDo];
    let tasksInProgressCopy = [...tasksInProgress];
    let tasksDoneCopy = [...tasksDone];

    let toDoIndex = tasksToDoCopy.findIndex(taskInArray => taskInArray.id == task.id);
    let inProgressIndex = tasksInProgressCopy.findIndex(taskInArray => taskInArray.id == task.id);
    let doneIndex = tasksDoneCopy.findIndex(taskInArray => taskInArray.id == task.id);


    if (toDoIndex >= 0) {
      taskService.deleteTask(task.id, "/toDoTasks");

      tasksToDoCopy.splice(toDoIndex, 1);
      setTasksToDo(tasksToDoCopy);
    }

    if (inProgressIndex >= 0) {
      taskService.deleteTask(task.id, "/inProgressTasks");

      tasksInProgressCopy.splice(inProgressIndex, 1);
      setTasksInProgress(tasksInProgressCopy);
    }

    if (doneIndex >= 0) {
      taskService.deleteTask(task.id, "/doneTasks");

      tasksDoneCopy.splice(doneIndex, 1);
      setTasksDone(tasksDoneCopy);
    }

    setImage(papeleraCerrada);
  }

  const allowDrop = (event) => {
    event.preventDefault();
    setImage(papeleraAbierta);
  }

  const closeTrash = () => {
    setImage(papeleraCerrada);
  }

  const taskDrop = (event, place) => {
    event.preventDefault();

    const task = JSON.parse(event.dataTransfer.getData("task"));

    let tasksToDoCopy = [...tasksToDo];
    let tasksInProgressCopy = [...tasksInProgress];
    let tasksDoneCopy = [...tasksDone];

    let toDoIndex = tasksToDo.findIndex(taskInArray => taskInArray.id == task.id);
    let inProgressIndex = tasksInProgress.findIndex(taskInArray => taskInArray.id == task.id);
    let doneIndex = tasksDone.findIndex(taskInArray => taskInArray.id == task.id);

    switch (place) {
      case "toDo":
        if (inProgressIndex >= 0) {
          let deletedTask = tasksInProgressCopy.splice(inProgressIndex, 1);
          setTasksInProgress(tasksInProgressCopy);
          taskService.deleteTask(task.id, "/inProgressTasks");

          tasksToDoCopy.push(deletedTask[0]);
          setTasksToDo(tasksToDoCopy);
          taskService.addTask(task, "/toDoTasks");
        }

        if (doneIndex >= 0) {
          let deletedTask = tasksDoneCopy.splicetoDoTasks(doneIndex, 1);
          setTasksDone(tasksDoneCopy);
          taskService.deleteTask(task.id, "/doneTasks");
          
          tasksToDoCopy.push(deletedTask[0]);
          setTasksToDo(tasksToDoCopy);
          taskService.addTask(task, "/toDoTasks");
        }
        break;
      case "inProgress":
        if(toDoIndex >= 0) {
          let deletedTask = tasksToDoCopy.splice(toDoIndex, 1);
          setTasksToDo(tasksToDoCopy);
          taskService.deleteTask(task.id, "/toDoTasks");

          tasksInProgressCopy.push(deletedTask[0]);
          setTasksInProgress(tasksInProgressCopy);
          taskService.addTask(task, "/inProgressTasks");
        }

        if(doneIndex >= 0) {
          let deletedTask = tasksDoneCopy.splice(doneIndex, 1);
          setTasksDone(tasksDoneCopy);
          taskService.deleteTask(task.id, "/doneTasks");

          tasksInProgressCopy.push(deletedTask[0]);
          setTasksInProgress(tasksInProgressCopy)
          taskService.addTask(task, "/inProgressTasks");
        }
        break;
      case "done":
        if(toDoIndex >= 0) {
          let deletedTask = tasksToDoCopy.splice(toDoIndex, 1);
          setTasksToDo(tasksToDoCopy);
          taskService.deleteTask(task.id, "/toDoTasks");

          tasksDoneCopy.push(deletedTask[0]);
          setTasksDone(tasksDoneCopy)
          taskService.addTask(task, "/doneTasks");
        }

        if(inProgressIndex >= 0) {
          let deletedTask = tasksInProgressCopy.splice(doneIndex, 1);
          setTasksInProgress(tasksInProgressCopy);
          taskService.deleteTask(task.id, "/inProgressTasks");

          tasksDoneCopy.push(deletedTask[0]);
          setTasksDone(tasksDoneCopy);
          taskService.addTask(task, "/doneTasks");
        }
        break;
    }
  }

  const taskAllowDrop = (event) => {
    event.preventDefault();
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
                <img src={image} alt="Icono no disponible" width={70} />
              </div>
            </div>
          </div>
          <div className="row">
            {/**To do tasks */}
            <div className="col-12 col-lg-4" onDrop={() => taskDrop(event, "toDo")} onDragOver={() => taskAllowDrop(event)} >
              <h3 className='text-center tittle'>Por hacer</h3>
              <hr />
              <div className='delimiter'>
                <ToDoList tasksToDo={tasksToDo} setTasksToDo={setTasksToDo}></ToDoList>
              </div>
            </div>

            {/**In progress tasks */}
            <div className="col-12 col-lg-4" onDrop={() => taskDrop(event, "inProgress")} onDragOver={() => taskAllowDrop(event)} >
              <h3 className='text-center tittle'>En progreso</h3>
              <hr />
              <div className='delimiter'>
                <InProgressList tasksInProgress={tasksInProgress} setTasksInProgress={setTasksInProgress} ></InProgressList>
              </div>
            </div>

            {/**Done tasks */}
            <div className="col-12 col-lg-4" onDrop={() => taskDrop(event, "done")} onDragOver={() => taskAllowDrop(event)} >
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
