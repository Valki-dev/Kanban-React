

const ToDoList = ({ tasksToDo, setTasksToDo }) => {
    const drag = (event, id) => {
        event.dataTransfer.setData("id", id);
    }

    return(
        <>
            {
                tasksToDo.map(({id, description, backgroundColor}) => {
                    return(
                        <div className="card m-4" key={id}>
                            <div className="card-body" draggable="true" onDragStart={() => drag(event, id)} style={{backgroundColor: backgroundColor, borderRadius: 6}}>
                                {description}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ToDoList;