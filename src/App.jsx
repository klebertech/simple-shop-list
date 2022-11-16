import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('todos'));
    return saved || '';
  });
  const [inputvalue, setInputvalue] = useState();

  function handleDelete(index) {
    const newTodos = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  }

  function handleSave(e) {
    e.preventDefault();
    setTodos((oldstate) => [...oldstate, inputvalue]);
    setInputvalue('');
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-blue-400 w-screen h-screen flex flex-wrap">
      <div className="flex flex-wrap flex-col mx-auto mt-12 text-center">
        <h1 className="text-4xl pb-12">Lista de compras</h1>
        <input
          type="text"
          className="mb-4 h-10 text-center shadow-md"
          placeholder="Adicionar Todo"
          onChange={(e) => setInputvalue(e.target.value)}
          value={inputvalue}
        />
        <div className="card">
          <button
            className="border-2 bg-slate-100 w-36 h-12"
            type="button"
            onClick={(e) => handleSave(e)}
          >
            Adicionar
          </button>
          <div>
            {todos
              && todos.map((todo, index) => (
                <div className="flex flex-wrap justify-between border-2 bg-slate-100 w-full my-2">
                  <div className="ml-4">{todo}</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                    onClick={() => handleDelete(index)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
