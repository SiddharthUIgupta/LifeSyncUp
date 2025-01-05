'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Hobby = {
  id: number;
  name: string;
  progress: number;
  goal: string;
}

export default function HobbyTracker() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [newHobby, setNewHobby] = useState('')
  const [newGoal, setNewGoal] = useState('')

  const addHobby = () => {
    if (newHobby.trim() && newGoal.trim()) {
      setHobbies([...hobbies, { id: Date.now(), name: newHobby, progress: 0, goal: newGoal }])
      setNewHobby('')
      setNewGoal('')
    }
  }

  const updateProgress = (id: number, increment: number) => {
    setHobbies(hobbies.map(hobby => 
      hobby.id === id ? { ...hobby, progress: Math.min(Math.max(hobby.progress + increment, 0), 100) } : hobby
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hobby Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Input
            type="text"
            placeholder="Add a new hobby"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Set a goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </div>
        <Button onClick={addHobby} className="w-full mb-4">Add Hobby</Button>
        <ul>
          {hobbies.map((hobby) => (
            <li key={hobby.id} className="mb-4 p-2 bg-white rounded-md shadow">
              <div className="flex justify-between mb-2">
                <span>{hobby.name}</span>
                <span className="text-sm text-gray-500">Goal: {hobby.goal}</span>
              </div>
              <Progress value={hobby.progress} className="mb-2" />
              <div className="flex justify-between">
                <Button onClick={() => updateProgress(hobby.id, -10)} size="sm" variant="outline">-10%</Button>
                <span>{hobby.progress}%</span>
                <Button onClick={() => updateProgress(hobby.id, 10)} size="sm" variant="outline">+10%</Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

