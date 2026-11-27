import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodos } from '../context/TodoContext';

const TodoInput = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-white/70 backdrop-blur-md border-2 border-transparent border-b-slate-200 px-5 py-3 rounded-2xl shadow-sm focus:shadow-xl focus:border-blue-400 focus:outline-none transition-all duration-300 text-base placeholder:text-slate-600 dark:bg-slate-800/80 dark:border-b-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors active:scale-95"
        >
          <Plus size={24} />
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
