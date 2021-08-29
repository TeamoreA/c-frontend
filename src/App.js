import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Todos from "./components/Todos";

const BASEURL = "https://c-backend-kkirjd3lsa-nw.a.run.app/todo";
const REQUESTHRADERS = { "Content-Type": "application/json" };

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [completing, setCompleting] = useState(false);

    const handleComplete = async (todo_id) => {
        let toComplete = todos[todo_id];
        toComplete.completed = !toComplete.completed;
        setTodos((prevState) => ({ ...prevState, [todo_id]: toComplete }));
        const url = BASEURL + "/" + todos[todo_id].id;
        setCompleting(true);

        await fetch(url, {
            method: "PUT",
            headers: REQUESTHRADERS,
        });
        setCompleting(false);
    };

    const saveTodo = (todoText) => {
        const todoData = {
            task: todoText,
        };
        const requestOptions = {
            method: "POST",
            headers: REQUESTHRADERS,
            body: JSON.stringify(todoData),
        };

        fetch(BASEURL, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos([data, ...todos]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const fetchTodos = async () => {
        setLoading(true);
        const resp = await fetch(BASEURL);
        const fetchedTodos = await resp.json();
        setTodos(fetchedTodos);
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Container>
            <Todos
                todos={todos}
                saveTodo={saveTodo}
                handleComplete={handleComplete}
                loadingTodos={loading}
                completingTodo={completing}
            />
        </Container>
    );
};

export default App;
