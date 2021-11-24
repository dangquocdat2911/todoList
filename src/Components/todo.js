import React, { useState, useEffect } from "react";
import { SaveTask, ListTask, DeleteTask, UpdateTask, ClearTask } from "../Shared/todo.service";
import { Input, Button, Col, Row } from 'reactstrap';
import ModalNoti from "../Shared/ModalNoti"
import { Priority, convertDate } from "../Constances/Const";
import randomId from "../Shared/randomId";
export const Todo = () => {
    let [tasks, setTasks] = useState([]);
    let [flag, setFlag] = useState(false);
    const today = new Date;
    const [textSeach, setText] = useState("");
    const [id, setId] = useState(0);
    const [tab, setTab] = useState(1);
    const [message, setMessage] = useState("");
    const current = new Date;
    const [task, setTask] = useState({
        id :randomId.number(12) ,
        title: "",
        description: "",
        date: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`,
        priority: "normal"
    });
    useEffect(() => {
        const listTasks = ListTask();
        setTasks(listTasks);
    }, [flag]);
    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleAddBtn = () => {
        if (task.title !== "" && task.description !== "" && task.date !== "" && task.priority !== "") {
            SaveTask(task);
            refesh()
            setFlag(!flag);
        }
        else {
            setMessage("Vui lòng nhập đầy đủ thông tin!!!")
        }
    }

    const handleDelBtn = (id) => {
        DeleteTask(id);
        setFlag(!flag);
    }

    const handleDetail = (value, id) => {
        setTask(value);
        setId(id);
        setTab(2)
    }

    const handleEditBtn = () => {
        UpdateTask(id, task);
        refesh()
        setTab(1)
        setFlag(!flag);
    }
    const handleDone = (value, id) => {
        const done = value;
        done.priority = "done";
        UpdateTask(id, done);
        setFlag(!flag);
    }
    const refesh = () => {
        setTask({
            id :randomId.number(12) , 
            title: "",
            description: "",
            date: `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`,
            priority: "normal"
        })
    }
    const handleClearBtn = () => {
        ClearTask();
        setFlag(!flag);
    }
    const closeNotice = () => {
        setMessage("");
    };
    const sortByName = (a, b) => {
        const aa = a.split("-")
        const bc = b.split("-")
        if (aa[0] >= bc[0] && aa[1] >= bc[1] && aa[2] >= bc[2]) return -1;
        if (aa[0] <= bc[0] && aa[1] <= bc[1] && aa[2] <= bc[2]) return 1;
        if (aa[0] == bc[0] && aa[1] <= bc[1] && aa[2] <= bc[2]) return 1;
        if (aa[0] == bc[0] && aa[1] == bc[1] && aa[2] <= bc[2]) return 1;
        if (aa[0] == bc[0] && aa[1] <= bc[1] && aa[2] == bc[2]) return 1;
        if (aa[0] <= bc[0] && aa[1] == bc[1] && aa[2] <= bc[2]) return 1;
        return 0
    }
    console.log(tasks);
    return (
        <div className="todo">
            <Row>
                <Col sm={6}>
                    <div className="createTask">
                        <h2 className="text-primary">New Task</h2>
                        <Row>
                            <span className="pb-2 text-primary"> <b>Nhập tiêu đề</b></span>
                            <Col>
                                <Input placeholder="Tiêu đề" className="title" name="title"
                                    value={task.title}
                                    onChange={(e) => handleChangeValue(e)}></Input>
                            </Col>
                        </Row>
                        <Row>
                            <span className="pb-2 text-primary"> <b>Nhập Nội dung</b></span>
                            <Col>
                                <textarea placeholder="Nhập nội dung"
                                    className="description" name="description"
                                    value={task.description}
                                    onChange={(e) => handleChangeValue(e)}></textarea>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <Input type="date" autocomplete name="date" value={task.date} onChange={(e) => handleChangeValue(e)}></Input>
                            </Col>
                            <Col sm="6">
                                <Input type="select" name="priority"
                                    onChange={(e) => handleChangeValue(e)}
                                    value={task.priority}
                                    required
                                >
                                    {Priority.map(el => {
                                        return (
                                            <option value={el.value} key={el.name}>{el.name}</option>
                                        )
                                    })}
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="end">
                                {tab == 1 ?
                                    <Button color="primary" onClick={() => handleAddBtn()}>Thêm mới</Button>
                                    : <Button color="primary" onClick={() => handleEditBtn()}>Cập nhật</Button>}
                            </Col>
                        </Row>

                    </div>
                </Col>
                <Col sm={6} className="listTask">
                    <div>
                        <h2 className="text-primary">Danh Sách công việc</h2>
                        <Row>
                            <Col>
                                <span className="pb-2 text-primary"> <b>Tìm kiếm</b></span>
                                <Input placeholder="nhập tiêu đề" name="textSearch"
                                    value={textSeach}
                                    onChange={e => setText(e.target.value)}></Input>
                            </Col>
                        </Row>
                        <Row >
                            <span className="pb-2 text-primary"> <b>Danh sách công việc</b></span>

                            <Row>
                                <Col sm="4">Tiêu đề</Col>
                                <Col sm="2">Ngày</Col>
                                <Col sm="2">Ưu tiên</Col>
                                <Col sm="4">Tùy chọn</Col>
                            </Row>

                            <Row className="tableTask">
                                <Col>
                                    {
                                        tasks?.filter(p => p.title?.search(textSeach) >= 0)
                                            .sort((a, b) => sortByName(a.date, b.date))
                                            .map((el, index) => {
                                                return (
                                                    <>
                                                        {el.priority !== "done" ?

                                                            <Row className="th_table">
                                                                <Col sm="4">{el.title}</Col>
                                                                <Col sm="2">{convertDate(el.date)}</Col>
                                                                <Col sm="2" className="pr-4">{el.priority}</Col>
                                                                <Col sm="4">
                                                                    <Button color="primary" size="sm" onClick={() => handleDone(el, el.id)}>Done</Button>{" "}
                                                                    <Button color="primary" size="sm" onClick={() => handleDetail(el, el.id)}>Chi tiết</Button>{" "}
                                                                    <Button color="danger" size="sm" onClick={() => handleDelBtn(el.id)}>Xóa</Button>
                                                                </Col>
                                                            </Row>
                                                            :
                                                            <Row className="th_table_done">
                                                                <Col sm="4">{el.title}</Col>
                                                                <Col sm="2">{convertDate(el.date)}</Col>
                                                                <Col sm="2" className="pr-4">{el.priority}</Col>
                                                                <Col sm="4">
                                                                    <Button color="primary" hidden size="sm" onClick={() => handleDone(el, index)}>Done</Button>{" "}
                                                                    <Button color="primary" disabled size="sm" onClick={() => handleDetail(el, index)}>Chi tiết</Button>{" "}
                                                                    <Button color="danger" disabled size="sm" onClick={() => handleDelBtn(index)}>Xóa</Button>
                                                                </Col>
                                                            </Row>
                                                        }
                                                    </>
                                                )
                                            })
                                    }
                                </Col>

                            </Row>
                            <Row>
                                <Col className="end">
                                    <Button color="danger" onClick={()=>handleClearBtn()}>Xóa tổng</Button>
                                </Col>
                            </Row>
                        </Row>

                    </div>

                </Col>
            </Row>

            <ModalNoti message={message} done={() => closeNotice()}></ModalNoti>
        </div>
    )
}