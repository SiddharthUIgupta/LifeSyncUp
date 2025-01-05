'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Friend = {
  id: number;
  name: string;
  avatar: string;
}

type Event = {
  id: number;
  name: string;
  date: Date;
  participants: number[];
}

export default function FriendConnect() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [newFriend, setNewFriend] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState('')
  const [newEventDate, setNewEventDate] = useState('')

  const addFriend = () => {
    if (newFriend.trim()) {
      setFriends([...friends, { id: Date.now(), name: newFriend, avatar: `/placeholder.svg?height=40&width=40` }])
      setNewFriend('')
    }
  }

  const addEvent = () => {
    if (newEvent.trim() && newEventDate) {
      setEvents([...events, { id: Date.now(), name: newEvent, date: new Date(newEventDate), participants: [] }])
      setNewEvent('')
      setNewEventDate('')
    }
  }

  const toggleParticipation = (eventId: number, friendId: number) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, participants: event.participants.includes(friendId) 
            ? event.participants.filter(id => id !== friendId)
            : [...event.participants, friendId] }
        : event
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend Connect</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Add a new friend"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            className="mb-2"
          />
          <Button onClick={addFriend} className="w-full">Add Friend</Button>
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="New event name"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            className="mb-2"
          />
          <Input
            type="date"
            value={newEventDate}
            onChange={(e) => setNewEventDate(e.target.value)}
            className="mb-2"
          />
          <Button onClick={addEvent} className="w-full">Add Event</Button>
        </div>
        <div>
          <h3 className="font-bold mb-2">Events:</h3>
          {events.map(event => (
            <div key={event.id} className="mb-4 p-2 bg-white rounded-md shadow">
              <h4>{event.name} - {event.date.toLocaleDateString()}</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {friends.map(friend => (
                  <Button
                    key={friend.id}
                    variant="outline"
                    size="sm"
                    className={`flex items-center ${event.participants.includes(friend.id) ? 'bg-primary text-primary-foreground' : ''}`}
                    onClick={() => toggleParticipation(event.id, friend.id)}
                  >
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    {friend.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

