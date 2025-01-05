'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type MoodEntry = {
  id: number;
  date: Date;
  mood: string;
  entry: string;
}

const moodValues: { [key: string]: number } = {
  'Very Sad': 1,
  'Sad': 2,
  'Neutral': 3,
  'Happy': 4,
  'Very Happy': 5,
}

export default function MoodJournal() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [mood, setMood] = useState('')
  const [entry, setEntry] = useState('')

  const addEntry = () => {
    if (mood && entry.trim()) {
      setEntries([...entries, { id: Date.now(), date: new Date(), mood, entry }])
      setMood('')
      setEntry('')
    }
  }

  const chartData = entries.map(entry => ({
    date: entry.date.toLocaleDateString(),
    mood: moodValues[entry.mood] || 3,
  }))

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Mood Journal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="Select your mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Very Sad">Very Sad</SelectItem>
              <SelectItem value="Sad">Sad</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Happy">Happy</SelectItem>
              <SelectItem value="Very Happy">Very Happy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Write your journal entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </div>
        <Button onClick={addEntry} className="w-full mb-4">Add Entry</Button>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ul>
          {entries.slice().reverse().map((entry) => (
            <li key={entry.id} className="mb-2 p-2 bg-white rounded-md shadow">
              <div className="flex justify-between mb-1">
                <span className="font-bold">{entry.mood}</span>
                <span className="text-sm text-gray-500">{entry.date.toLocaleString()}</span>
              </div>
              <p>{entry.entry}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

