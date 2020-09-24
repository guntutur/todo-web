import React, { Component } from "react";
import FlipMove from "react-flip-move";
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
        /*var updatedItem = {
            key: item.todo.key,
            task_content: item.todo.task_content,
            created_date: item.todo.created_date,
            tags: "deleted"
        };
        await todosStore.editItem(item._id, {
            todo: updatedItem
        }, userStore.data);*/
        await todosStore.deleteItem(item._id, userStore.data);
    };

    createTasks(item) {
        return <li
            className={todosStore.checkIsUploaded(item) ? "li-synced" : "li-unsynced"}
            onClick={() => this.deleteTodo(item)}
            key={item.todo.key}>{
                // item.todo.tags == "deleted" ?
                //     <strike>item.todo.task_content</strike> :
                    item.todo.task_content
            }</li>
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