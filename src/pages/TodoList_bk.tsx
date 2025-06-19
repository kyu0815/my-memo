import React, { useState } from "react";

const TodoList: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e?.target?.value);
  };

  const handleAdd = () => {
    if (!inputText?.trim()) return;
    setTodos([...todos, inputText]);
    setInputText("");
  };

  const handleDelete = (index: number) => {
    const newTodos = todos.filter((_, i) => i != index);
    setTodos(newTodos);
  };
  return (
    <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">📝 Todo List 페이지입니다!</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e?.key == "Enter") handleAdd();
          }}
          placeholder="메모를 입력하세요"
          className="flex-1 border border-gary-300 rounded px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded 
          hover:bg-blue-600"
        >
          추가
        </button>
      </div>
      <ul className="mt-5">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-2 
            bg-gray-100 px-3 py-1 rounded"
          >
            <span>{todo}</span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
