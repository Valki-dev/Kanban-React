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

const getAllInProgressTasks = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(inProgressEndpoint, requestOptions)
        .then(response => response.json())
}

const getAllDoneTasks = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(doneEndpoint, requestOptions)
        .then(response => response.json())
}

const createTask = (task) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(task);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(toDoEndpoint, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export default {
    getAllToDoTasks,
    getAllInProgressTasks,
    getAllDoneTasks,
    createTask
}