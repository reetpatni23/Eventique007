"use client";
import { createContext, useContext, useState, ReactNode } from 'react'

type Task = {
  id: number
  title: string
  completed: boolean
}

type TaskContextType = {
  tasks: Task[]
  addTask: (title: string) => void
  toggleTask: (id: number) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask = { id: Date.now(), title, completed: false }
    setTasks(prev => [...prev, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTaskContext must be used within TaskContextProvider')
  return context
}
