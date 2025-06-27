"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MoreHorizontal, Clock, User, Flag } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  tags: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
  color: string
}

export default function DemoKanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-500",
      tasks: [
        {
          id: 1,
          title: "Design Homepage",
          description: "Create wireframes and mockups",
          priority: "high",
          assignee: "John",
          dueDate: "2024-01-15",
          tags: ["Design", "UI"],
        },
        {
          id: 2,
          title: "Setup Database",
          description: "Configure PostgreSQL",
          priority: "medium",
          assignee: "Alice",
          dueDate: "2024-01-20",
          tags: ["Backend"],
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      color: "bg-blue-500",
      tasks: [
        {
          id: 3,
          title: "API Development",
          description: "Build REST endpoints",
          priority: "high",
          assignee: "Bob",
          dueDate: "2024-01-18",
          tags: ["API", "Backend"],
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "bg-yellow-500",
      tasks: [
        {
          id: 4,
          title: "Code Review",
          description: "Review authentication module",
          priority: "medium",
          assignee: "Charlie",
          dueDate: "2024-01-16",
          tags: ["Review"],
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-500",
      tasks: [
        {
          id: 5,
          title: "Project Setup",
          description: "Initialize repository",
          priority: "low",
          assignee: "John",
          dueDate: "2024-01-10",
          tags: ["Setup"],
        },
      ],
    },
  ])

  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task)
    setDraggedFrom(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()

    if (!draggedTask || !draggedFrom) return

    if (draggedFrom === targetColumnId) return

    setColumns((prev) =>
      prev.map((column) => {
        if (column.id === draggedFrom) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
          }
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask],
          }
        }
        return column
      }),
    )

    setDraggedTask(null)
    setDraggedFrom(null)
  }

  const addTask = (columnId: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      description: "Task description",
      priority: "medium",
      assignee: "Unassigned",
      dueDate: new Date().toISOString().split("T")[0],
      tags: ["New"],
    }

    setColumns((prev) =>
      prev.map((column) => (column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column)),
    )
  }

  return (
    <div className="bg-gray-100 rounded-lg p-3 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Project Board</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-white rounded-lg p-2 flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <span className="font-medium text-sm text-gray-800">{column.title}</span>
                <span className="bg-gray-200 text-gray-600 text-xs px-1 rounded">{column.tasks.length}</span>
              </div>
              <button onClick={() => addTask(column.id)} className="text-gray-400 hover:text-gray-600">
                <Plus size={14} />
              </button>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className="bg-white border border-gray-200 rounded p-2 cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-xs text-gray-800 line-clamp-2">{task.title}</h4>
                    <Flag className={`${getPriorityColor(task.priority)} flex-shrink-0`} size={10} />
                  </div>

                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {task.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={10} />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>Add commentMore actions
          </div>
        ))}
      </div>
    </div>
  )
}
