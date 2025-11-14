import React, { useState } from 'react';
import './Todo.css';
import todoIcon from '../assets/todo_icon.png';
import tick from '../assets/tick.png';
import notTick from '../assets/not_tick.png';
import deleteIcon from '../assets/delete.png';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <img src={todoIcon} alt="Todo Icon" className="todo-icon" />
        <h1>To-Do List</h1>
      </div>

      <div className="input-box">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add your task"
        />
        <button onClick={addTodo}>ADD +</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
              <img 
                src={todo.completed ? tick : notTick} 
                alt="Checkbox" 
                className="checkbox-img"
              />
              <span>{todo.text}</span>
            </div>
            <img 
              src={deleteIcon} 
              alt="Delete" 
              className="delete-icon"
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;