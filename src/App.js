import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos";

export const App = () => {
    const [todos, setTodos] = useState({});

    async function handleComplete(id) {
        const url = "http://localhost:5000/todos/" + id;
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
        let toComplete = todos[id]
        toComplete.completed = !toComplete.completed
        console.log(toComplete);
        // TODO
        setTodos(...toComplete.id, toComplete)
    }
    function saveTodo(todoText) {
        const id = Date.now();
        const todoData = {
            todo: {
                [id]: {
                    task: todoText,
                    completed: false,
                },
            },
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todoData),
        };
        const url = "http://localhost:5000/todos";
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then(() => {
                setTodos({ ...todos, ...todoData.todo });
            })
            .catch((error) => {
                console.error("Error:", error);
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
            <Todos
                todos={todos}
                saveTodo={saveTodo}
                handleComplete={handleComplete}
            />
        </Container>
    );
};

export default App;
