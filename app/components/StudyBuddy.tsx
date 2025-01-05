'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Flashcard = {
  id: number;
  question: string;
  answer: string;
}

export default function StudyBuddy() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')

  const searchTopic = () => {
    // In a real app, this would call an API or search a database
    setSearchResult(`Here's what I found about "${searchTerm}"...`)
  }

  const addFlashcard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setFlashcards([...flashcards, { id: Date.now(), question: newQuestion, answer: newAnswer }])
      setNewQuestion('')
      setNewAnswer('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Buddy</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Topic Search</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="flex mb-4">
              <Input
                type="text"
                placeholder="Search a topic"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Button onClick={searchTopic}>Search</Button>
            </div>
            {searchResult && <p className="mt-4">{searchResult}</p>}
          </TabsContent>
          <TabsContent value="flashcards">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Input
                type="text"
                placeholder="Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Answer"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </div>
            <Button onClick={addFlashcard} className="w-full mb-4">Add Flashcard</Button>
            <ul>
              {flashcards.map((card) => (
                <li key={card.id} className="mb-2 p-2 bg-white rounded-md shadow">
                  <strong>Q: {card.question}</strong>
                  <p>A: {card.answer}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

