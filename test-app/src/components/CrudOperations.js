import { requestFactory } from "../services/requester"
import { useState } from "react"

import ListData from "./ListData"

const CrudOperations = () => {
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [disableButton, setDisableButton] = useState(false);

    const request = requestFactory();

    const loadData = async () => {
        setDisableButton(true);
        setDataLoaded(false);

        try {
            const newData = await request.get("/Items");
            setData(newData);
        } catch (err) {
            //Do nothing
        }

        setDataLoaded(true);
        setDisableButton(false);
    }

    const onDelete = async (id) => {
        try {
            await request.delete(`/Items?id=${id}`);
            loadData();
        } catch (err) {
            //Do nothing
        }
    }

    const onChange = (e) => {
        setInputValue(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setDisableButton(true);

        try {
            await request.post("/Items", { name: inputValue });
            setInputValue('');
            loadData();
        } catch (err) {
            //Do nothing
        }

        setDisableButton(false);
    }

    return (
        <>
            <div className="getContainer">
                <h1>Get Names</h1>
                <button onClick={() => loadData()} disabled={disableButton}>Load Names</button>
            </div>


            <div className="postContainer">
                <h1>Post Name</h1>
                <form onSubmit={onSubmit}>
                    <input name='name' id='name' value={inputValue} onChange={onChange} type="text" placeholder="Enter name" />
                    <button type='submit' disabled={disableButton}>Add Name</button>
                </form>
            </div >

            <div className="itemsContainer">
                <h1>List / Delete Names</h1>

                {dataLoaded ? null : <h2>Loading...</h2>}

                {dataLoaded && data.length > 0
                    ?
                    <ListData data={data} onDelete={onDelete} />
                    :
                    null}
            </div>
        </>
    )

}

export default CrudOperations;