import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/todolist`)
            .then((res) => setMessage(res.data.message))
            .catch((err) => console.error("Error:", err));
    }, []);

    return <h1>{message}</h1>;
}

export default App;
