import React from "react";
import {
    Form,
    Button,
    ListGroup,
    Row,
    Col,
    Navbar,
} from "react-bootstrap";

const Todos = ({ allTodos }) => {
    return (
        <>
            <Navbar>
                    <Navbar.Brand href="#home">CK Todos</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            See your todos here
                        </Navbar.Text>
                    </Navbar.Collapse>
            </Navbar>
            <Row>
                <Col md={4}>
                    <Form>
                        <Form.Control type="text" placeholder="Enter todo" />
                        <br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item
                            style={{
                                textDecoration: true ? "line-through" : "none",
                            }}
                        >
                            Cras justo odio
                        </ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};

export default Todos;
