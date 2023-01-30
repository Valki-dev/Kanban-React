const DoneList = ({ tasksDone, setTasksDone }) => {
    const drag = (event, id) => {
        event.dataTransfer.setData("id", id);
    }

    return(
        <>
            {
                tasksDone.map(({id, description, backgroundColor}) => {
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

export default DoneList;