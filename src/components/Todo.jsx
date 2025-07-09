import { useEffect, useRef } from 'react';
import { useState } from 'react';
import React from 'react';
import todo_icon from '../assets/todo_icon.png';
import Todoitems from './Todoitems';

const Todo = () => {
    const [todoList, setTodoList] = useState(
        localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    );

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        if (inputText === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = '';
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) => {
        setTodoList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className='bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mt-8 p-5 sm:p-7 rounded-xl shadow-md'>
            {/* Header */}
            <div className='flex items-center gap-2 mb-6'>
                <img className="w-8 sm:w-10" src={todo_icon} alt="Todo icon" />
                <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>To-do List</h1>
            </div>

            {/* Input */}
            <div className='flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-full p-2 sm:p-0 sm:pl-4'>
                <input
                    ref={inputRef}
                    className='bg-transparent flex-1 h-12 sm:h-14 px-4 placeholder:text-slate-600 text-base sm:text-lg focus:outline-none'
                    type="text"
                    placeholder='Add your task'
                />
                <button
                    onClick={add}
                    className='bg-orange-600 text-white text-base sm:text-lg font-medium rounded-full h-12 sm:h-14 px-6 sm:px-8 transition hover:bg-orange-700'
                >
                    ADD +
                </button>
            </div>

            {/* Tasks */}
            <div className="mt-6">
                {todoList.map((item, index) => (
                    <Todoitems
                        key={index}
                        text={item.text}
                        id={item.id}
                        isComplete={item.isComplete}
                        deleteTodo={deleteTodo}
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
