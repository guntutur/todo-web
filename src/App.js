import React from 'react';
import './App.css';
import "./todos/TodoList.css";
import TodoList from "./todos/TodoList";
import userStore from "./store/user";
import todosStore from "./store/todos";

window.userStore = userStore;
window.todosStore = todosStore;

class BaseComponent extends React.PureComponent {
  rerender = () => {
    this.setState({
      _rerender: new Date(),
    });
  }
}

class App extends BaseComponent {
  state = {
    isInitialized: false,
  };

  render() {
    if (!this.state.isInitialized) {
      return null;
    }

    return (
        userStore.data.email ? (
            <Landing/>
        ) : (
            <Login/>
        )
    );
  }

  async componentDidMount() {
    await userStore.initialize();
    this.setState({
      isInitialized: true,
    });

    this.unsubUser = userStore.subscribe(this.rerender);
  }

  async componentDidUpdate() {
    if (userStore.data.email && !todosStore.isInitialized) {
      console.log('popup initialize all offline data...');
      todosStore.setName(userStore.data.id);
      await todosStore.initialize();
      console.log('popup done');
    }
  }

  componentWillUnmount() {
    this.unsubUser();
  }
}

class Landing extends BaseComponent {

  state = {
    input_text: '',
  };

  render() {
    return (
        <div>
          <h1>Offline-First Todo Apps with ReactJS and CouchDB</h1>
          <h2>{userStore.data.email} <button className={"button-style"} onClick={this.logout}>logout</button></h2>
          <TodoList/>
        </div>
    )
  }

  logout = async () => {
    await todosStore.deinitialize();
    await userStore.deleteSingle();
  }
}

class Login extends BaseComponent {
  state = {
    email: '',
  }

  render() {
    return (
        <form onSubmit={this.submit}>
          <h1>login</h1>
          <p>
            email <input type='text' value={this.state.email} onChange={this.setInput_email} />
          </p>
          <p>
            <button>submit</button>
          </p>
        </form>
    );
  }

  setInput_email = (event) => {
    this.setState({
      email: (event.target.value || '').trim(),
    });
  }

  submit = async (event) => {
    event.preventDefault();

    if (!this.state.email) {
      alert('gunakan email @gmail');
      return;
    }
    if (!this.state.email.endsWith('@gmail.com')) {
      alert('gunakan email @gmail.com');
      return;
    }

    let id = this.state.email;
    id = id.split('@').shift().replace(/\W/g, '');

    await userStore.editSingle({
      id,
      email: this.state.email,
    });
  }
}

export default App;
