import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Check, X, Square, CheckSquare } from 'lucide-react';
import { useTodos } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const { deleteTodo, toggleTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-effect mb-3 p-4 rounded-xl flex items-center justify-between group transition-all duration-300 hover:shadow-2xl hover:border-blue-200"
    >
      <div className="flex items-center flex-1 mr-4">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mr-3 transition-colors duration-200 ${
            todo.completed ? 'text-green-500 dark:text-green-400' : 'text-slate-600 hover:text-blue-700 dark:hover:text-blue-400'
          }`}
        >
          {todo.completed ? <CheckSquare size={24} /> : <Square size={24} />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
              autoFocus
              className="w-full bg-slate-100 border-none rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-blue-400"
            />
            <button onClick={handleEdit} className="text-green-500 hover:bg-green-50 p-1 rounded">
              <Check size={20} />
            </button>
            <button onClick={() => setIsEditing(false)} className="text-red-500 hover:bg-red-50 p-1 rounded">
              <X size={20} />
            </button>
          </div>
        ) : (
          <span
              className={`text-base transition-all duration-300 leading-snug ${
                todo.completed ? 'centered-strike text-slate-600 dark:text-slate-500' : 'text-slate-900 font-medium dark:text-slate-200'
              }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TodoItem;
