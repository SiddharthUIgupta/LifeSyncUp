'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"

type Task = {
  id: number;
  name: string;
  dueDate: Date;
  category: string;
  priority: string;
  completed: boolean;
}

export default function SmartPlanner() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('')

  const addTask = () => {
    if (newTask.trim() && dueDate && category && priority) {
      setTasks([...tasks, {
        id: Date.now(),
        name: newTask,
        dueDate,
        category,
        priority,
        completed: false
      }])
      setNewTask('')
      setDueDate(undefined)
      setCategory('')
      setPriority('')
    }
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Smart Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="homework">Homework</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
              <SelectItem value="test">Test</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={setDueDate}
            className="rounded-md border"
          />
        </div>
        <Button onClick={addTask} className="w-full mb-4">Add Task</Button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between mb-2 p-2 bg-white rounded-md shadow">
              <div className="flex items-center">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className="mr-2"
                />
                <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                {task.category} | {task.priority} | {task.dueDate.toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

