import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos";

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    async function handleComplete(todo_id) {
        let toComplete = todos[todo_id];
        toComplete.completed = !toComplete.completed;
        setTodos((prevState) => ({ ...prevState, [todo_id]: toComplete }));
        const url = "http://localhost:8080/todo/" + todos[todo_id].id;
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
    }
    function saveTodo(todoText) {
        const todoData = {
            task: todoText,
        };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todoData),
        };
        const url = "http://localhost:8080/todo";
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos({ ...todos, data });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            const url = "http://localhost:8080/todo";
            const resp = await fetch(url);
            const fetchedTodos = await resp.json();
            setTodos(fetchedTodos);
            setLoading(false);
        };
        fetchTodos();
    }, []);
    return (
        <Container>
            <Todos
                todos={todos}
                saveTodo={saveTodo}
                handleComplete={handleComplete}
                loadingTodos={loading}
            />
        </Container>
    );
};

export default App;
