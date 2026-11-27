# Planora - To-Do App

A sleek, modern to-do list web application built with **React**, **Context API**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**. Manage your tasks with style — add, edit, delete, mark complete, set due dates and priority, filter tasks, and persist everything locally.

## Tech Stack

- React 18
- Context API (state management)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Lucide React (icons)
- Vite (build tool)

## Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Due dates and priority levels (Low/Medium/High)
- ✅ Filter tasks: All / Active / Completed
- ✅ Clear completed tasks
- ✅ Progress bar and daily stats
- ✅ Light / Dark theme toggle
- ✅ LocalStorage persistence
- ✅ Framer Motion animations
- ✅ Responsive glassmorphism UI
- ✅ FAQ accordion section

## Folder Structure

```
todo-list/
├── public/
│   └── image.jpg              # Background image
├── src/
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   ├── index.html
│   ├── components/
│   │   ├── TodoInput.jsx      # Add task form
│   │   ├── TodoItem.jsx       # Individual task item
│   │   └── TodoList.jsx       # Task list container
│   ├── context/
│   │   └── TodoContext.jsx    # Context API state
│   └── styles/
│       └── index.css          # Tailwind + custom styles
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```
