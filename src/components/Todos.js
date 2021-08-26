import React, { useState } from "react";
import {
    Form,
    Button,
    ListGroup,
    Row,
    Col,
    Navbar,
    Alert,
} from "react-bootstrap";

const Todos = ({ todos, saveTodo }) => {
    const [todoValue, setTodoValue] = useState("");
    function submitTodo(e) {
        e.preventDefault();
        saveTodo(todoValue);
        setTodoValue("");
    }
    const TodoList = () => {
        if (Object.keys(todos).length === 0) {
            return (
                <Alert variant="primary">
                    Oops! seems like you have nothing TODO!
                </Alert>
            );
        } else {
            return (
                <ListGroup>
                    {Object.entries(todos).map(([i, todo]) => (
                        <ListGroup.Item
                            key={i}
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                            }}
                        >
                            {todo.task}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        }
    };
    return (
        <>
            <Navbar>
                <Navbar.Brand href="#home">CK Todos</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>See your todos here</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col md={4}>
                    <Form onSubmit={submitTodo}>
                        <Form.Control
                            type="text"
                            placeholder="Enter todo"
                            value={todoValue}
                            onChange={(e) => setTodoValue(e.target.value)}
                        />
                        <br />
                        {todoValue.trim() && (
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Form>
                </Col>
                <Col md={8}>
                    <TodoList />
                </Col>
            </Row>
        </>
    );
};

export default Todos;
