import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos";

export const App = () => {
    const [todos, setTodos] = useState({});

    function saveTodo(todoText) {
        const id = Date.now();
        const todoData = {todo: {
            [id]: {
                task: todoText,
                completed: false
            },
        },}
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                todoData
            ),
        };
        const url = "http://localhost:5000/todos";
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos({...todos, ...todoData.todo});
            });
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const url = "http://localhost:5000/todos";
            const resp = await fetch(url);
            const fetchedTodos = await resp.json();
            setTodos(fetchedTodos);
        };
        fetchTodos();
    }, []);
    return (
        <Container>
            <Todos todos={todos} saveTodo={saveTodo} />
        </Container>
    );
};

export default App;
