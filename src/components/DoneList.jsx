const DoneList = ({ tasksDone, setTasksDone }) => {
    return(
        <>
            {
                tasksDone.map(({id, description, backgroundColor}) => {
                    return(
                        <div className="card m-4" key={id}>
                            <div className="card-body" draggable="true" style={{backgroundColor: backgroundColor, borderRadius: 6}}>
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