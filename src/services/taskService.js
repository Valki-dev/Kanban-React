const toDoEndpoint = "http://localhost:3000/toDoTasks";
const inProgressEndpoint = "http://localhost:3000/inProgressTasks";
const doneEndpoint = "http://localhost:3000/doneTasks";

const getAllToDoTasks = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    return fetch(toDoEndpoint, requestOptions)
        .then(response => response.json())
        
}

export default {
    getAllToDoTasks
}