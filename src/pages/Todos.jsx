import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";
import { Form, Table, Badge, Button, Modal } from 'react-bootstrap';

const Todos = () => {

  const newTitleRef = useRef()
  const newIdRef = useRef()

  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPage, setNumPages] = useState(1);
  const [curPage, setCurPages] = useState(1);


  useEffect(() => {
    const data = fetchTodos();
    setTodosRaw(data);
  }, []);


  useEffect(() => {
    const totalPages = Math.ceil(todosRaw.length / itemsPerPage);
    setNumPages(totalPages);
  }, [todosRaw, itemsPerPage]);


  useEffect(() => {

    let filtered = onlyWaiting ? todosRaw.filter(t => !t.completed) : todosRaw;

    const startIndex = (curPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filtered.slice(startIndex, endIndex);
    setTodos(paginated);
  }, [todosRaw, curPage, itemsPerPage, onlyWaiting]);

  const waitingClciked = (id) => {
    console.log(id)

    const foundTodo = todos.find((todo) => {
      return todo.id === id
    })

    foundTodo.completed = true

    setTodosRaw([...todosRaw])
  }

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id))

  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClicked = (id, title) => {
    console.log(id, title)
    if (title.trim() !== "") {
      setTodosRaw([...todosRaw,
      {
        "userId": 1,
        id,
        title,
        "completed": false
      }])

    }
    newIdRef.current.value
    newTitleRef.current.value
    handleClose()
  }

  return (
    <div style={{ border: '2px solid #141414ff', backgroundColor: '#0C0C0C', borderRadius: '20px', padding: '0.5rem', margin: '20px', textAlign: 'center' }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce(
                    (prev, todo) => todo.id > prev ? todo.id : prev,
                    -1
                  ) + 1
                }
                autoFocus
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>

            <Form.Label>Title:</Form.Label>
            <Form.Control
              placeholder="new todo, here!"
              autoFocus
              ref={newTitleRef}

            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveClicked(Number(newIdRef.current.value), newTitleRef.current.value)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check
              type="switch"
              id="custom-switch"
              onChange={(e) => {
                setOnlyWaiting(e.target.checked);
                setCurPages(1);
              }}
              label=""
            />
            <span className="ms-2">Show only&nbsp; <Button variant="warning">waiting<i className="bi bi-clock"></i></Button></span> {/* ข้อความข้างๆ toggle */}
          </div>
          <Form.Select
            className="w-25"
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurPages(1);
            }}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      <Table striped bordered hover className="mt-2">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '3rem' }}>ID</th>
            <th className='text-center'>Title</th>
            <th className="text-end" style={{ width: '12rem' }}>
              Completed <Button on onClick={() => handleShow()}> <i className='bi bi-plus'></i></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="text-center">
                <h5><Badge bg="secondary">{todo.id}</Badge></h5>
              </td>
              <td>{todo.title}</td>
              <td className="text-end">
                {todo.completed ? (
                  <Badge bg='success' className="fs-6">done</Badge>
                ) : (
                  <Button variant="warning" onClick={() => waitingClciked(todo.id)}>
                    Waiting&nbsp;<i className="bi bi-clock"></i>
                  </Button>
                )}
                &nbsp;
                <Button variant="danger" onClick={() => deleteClicked(todo.id)}>
                  <i className="bi bi-trash3"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-center">
        <Button variant="outline-primary"
          onClick={() => setCurPages(1)}
          disabled={curPage === 1}
        >First</Button>&nbsp;

        <Button variant="outline-primary"
          onClick={() => setCurPages((p) => p - 1)}
          disabled={curPage === 1}
        >Previous</Button>&nbsp;

        <span>
          {curPage} &nbsp;/&nbsp; {numPage}
        </span>&nbsp;

        <Button
          variant="outline-primary"
          onClick={() => setCurPages((p) => p + 1)}
          disabled={curPage === numPage}
        >
          Next
        </Button>&nbsp;

        <Button
          variant="outline-primary"
          onClick={() => setCurPages(numPage)}
          disabled={curPage === numPage}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Todos;
