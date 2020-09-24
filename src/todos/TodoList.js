// import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import todosStore from "../store/todos";
import userStore from "../store/user";
import * as React from "react";

class BaseComponent extends React.PureComponent {
    rerender = () => {
        this.setState({
            _rerender: new Date(),
        });
    }
}

class TodoList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {items: []};
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    async addItem(e) {
        e.preventDefault();
        if (this._inputElement.value !== "") {
            var newItem = {
                key: Date.now(),
                task_content: this._inputElement.value,
                created_date: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now()),
                tags: "active"
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this._inputElement.value = "";

            await todosStore.addItem({
                todo: newItem,
            }, userStore.data);
        }
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a}
                            placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                        <button className={"button-style"} type="submit" onClick={this.upload}>
                            {`Sync (${todosStore.countUnuploadeds()})`}</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                            delete={this.deleteItem}/>
            </div>
        );
    }

    componentDidMount() {
        this.unsubTodos = todosStore.subscribe(this.rerender);
    }

    componentWillUnmount() {
        this.unsubTodos();
    }

    upload = async () => {
        console.log('uploading...');
        try {
            await todosStore.upload();
            console.log('upload done');
        } catch (err) {
            alert(err.message);
            console.log('upload failed');
        }
    };
}

export default TodoList;