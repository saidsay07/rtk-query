import React, {useState} from "react";
import {
    useAddGoodMutation,
    useDeleteGoodMutation,
    useGetGoodsQuery,
} from "./store/goodsApi.jsx";

function App() {
    const [count, setCount] = useState("");
    const {data = [], isLoading} = useGetGoodsQuery(count);
    const [newGoodName, setNewGoodName] = useState("");
    const [addGood] = useAddGoodMutation();
    const [deleteGood] = useDeleteGoodMutation();

    if (isLoading) {
        return <h2>loading...</h2>;
    }

    async function handleAddGood() {
        await addGood(newGoodName).unwrap();
        setNewGoodName("");
    }

    async function handleDeleteGood(id) {
        await deleteGood(id).unwrap();
    }

    return (
        <>
            <input
                type="text"
                value={newGoodName}
                onChange={(e) => setNewGoodName(e.target.value)}
            />
            <button onClick={handleAddGood}>Add product</button>
            <select value={count} onChange={(e) => setCount(e.target.value)}>
                <option value="">all</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <ul>
                {data.map((good) => {
                    return (
                        <li onClick={() => handleDeleteGood(good.id)} key={good.id}>
                            {good.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default App;
