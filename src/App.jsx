import { useEffect, useState } from 'react';
import { TodoProvider } from './context/TodoContext';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodos } from './context/TodoContext';
import { ListTodo, Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react';

const AppContent = () => {
  const { todos } = useTodos();
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const [openFaq, setOpenFaq] = useState(null);

  const FAQS = [
    {
      question: 'How do I add a new task?',
      answer: 'Type your task in the input field at the top and press Enter or click the plus icon to add it.',
    },
    {
      question: 'Can I edit or delete tasks?',
      answer: 'Yes. Click the edit icon to modify a task, or the trash icon to remove it.',
    },
    {
      question: 'How do I mark a task as complete?',
      answer: 'Click the checkbox next to any task to mark it as completed.',
    },
    {
      question: 'Is my data saved?',
      answer: "Yes. Your tasks and theme preference are saved in your browser's local storage.",
    },
  ];

  const wrapperClass = `relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
    theme === 'dark' ? 'bg-transparent text-slate-100' : 'bg-transparent text-slate-900'
  }`;

  const themeTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const themeSubtitle = theme === 'dark' ? 'text-slate-400' : 'text-slate-700';
  const themeBadge = theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-700 text-white';

  return (
    <div className="todo-app-bg">
      <div className="blob" />
      <div className="grain" />
      <div className="dashboard-pattern" />
      <div className={wrapperClass}>
        <div className="max-w-2xl mx-auto">
          <header className="mb-8 relative text-center">
            <div className="fixed top-4 right-4 z-20">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-all shadow-lg"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} className="dark:hidden" /> : <Sun size={20} className="hidden dark:block" />}
              </button>
            </div>
            <div className="inline-flex items-center justify-center p-2.5 bg-blue-500 rounded-xl mb-3 text-white dark:bg-blue-600">
              <ListTodo size={24} />
            </div>
            <h1 className={`text-2xl font-extrabold tracking-tight mb-2 ${themeTitle}`}>
              Planora - Organize Your Day
            </h1>
            <p className={`text-lg font-medium ${themeSubtitle}`}>
              {greeting}, Ready to get things done?
            </p>
          </header>

          <div className="mb-5 glass-effect p-4 rounded-2xl border border-white/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className={`text-base font-bold ${themeTitle}`}>Daily Progress</h2>
                <p className={`text-sm ${themeSubtitle}`}>
                  {completedCount} of {totalCount} tasks completed
                </p>
              </div>
              <div className={`text-xl font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                {percentage}%
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <div
                className="bg-blue-500 h-full transition-all duration-700 ease-out rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <TodoInput />
          <TodoList />

          <div className="mt-8 glass-effect p-4 rounded-2xl border border-white/30">
            <h2 className={`text-lg font-bold mb-4 ${themeTitle}`}>Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQS.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-3 transition-all ${
                    theme === 'dark' ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-white/60'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq((prev) => (prev === index ? null : index))}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 text-xs font-bold text-center rounded-full ${themeBadge}`}>
                        {index + 1}
                      </span>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {openFaq === index && (
                    <div className={`mt-2 pt-2 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-800'} leading-relaxed`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <footer className={`mt-10 text-center text-lg ${themeSubtitle}`}>
            <p>
              © {new Date().getFullYear()} Planora. Built with React & Tailwind.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;
