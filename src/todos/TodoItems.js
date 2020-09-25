import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import todosStore from "../store/todos";
import userStore from "../store/user";
import "./TodoList.css";

window.todosStore = todosStore;
window.userStore = userStore;

class TodoItems extends Component {

    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this);
    }

    deleteTodo = async (item) => {
        await todosStore.deleteItem(item._id, userStore.data);
    };

    completeTodo = async (item) => {
        var completedTodo = {
            key: item.todo.key,
            task_content: item.todo.task_content,
            created_date: item.todo.created_date,
            tags: "completed"
        };
        await todosStore.editItem(item._id,{
            todo: completedTodo
        });
    };

    createTasks(item) {
        return <li
            className={todosStore.checkIsUploaded(item) ? "li-synced" : "li-unsynced"}
            key={item.todo.key}>{
                item.todo.tags === "completed" ?
                    <strike>{item.todo.task_content}</strike> :
                    item.todo.task_content
            }
            <FontAwesomeIcon onClick={() => this.completeTodo(item)} style={{cursor:"pointer"}} icon="check-circle"></FontAwesomeIcon>
            |
            <FontAwesomeIcon onClick={() => this.deleteTodo(item)} style={{cursor:"pointer"}} icon="trash"></FontAwesomeIcon>
        </li>
    }

    render() {
        var todoEntries = [];
        todosStore.data.map((pouchObj, index) => (
            todoEntries.push(pouchObj)
        ));
        var listItems = todoEntries.map(this.createTasks);

        return (
            <ul className="theList">
                <FlipMove duration={250} easing="ease-out">
                    {listItems}
                </FlipMove>
            </ul>
        );
    }
};

export default TodoItems;