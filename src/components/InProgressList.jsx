const InProgressList = ({ tasksInProgress, setTasksInProgress }) => {
    const drag = (event, task) => {
        event.dataTransfer.setData("task", JSON.stringify(task));
    }

    return(
        <>
            {
                tasksInProgress.map((task) => {
                    let {id, description, backgroundColor} = task;
                    return (
                        <div className="card m-4" key={id}>
                            <div className="card-body" draggable="true" onDragStart={() => drag(event, task)} style={{backgroundColor: backgroundColor, borderRadius: 6}}>
                                {description}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default InProgressList;