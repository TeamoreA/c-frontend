import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos";

export const App = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        /* eslint-disable no-unused-vars */
        const fetchTodos = async () => {
            const url = "http://localhost:8000/prezis/";
            const resp = await fetch(url);
            const fetchedTodos = await resp.json();
            setTodos(fetchedTodos);
        };
    });
    return (
        <Container>
            <Todos todos={todos} />
        </Container>
    );
};

export default App;
