"use client"

import { useState } from "react"
import GuestbookForm from "./guestbook-form"
import GuestbookEntries from "./guestbook-entries"

export interface Entry {
  id: number
  name: string
  message: string
  drawing: string | null
  timestamp: string
}

export default function GuestbookContainer() {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      name: "Alice",
      message: "What a lovely park bench!",
      drawing: null,
      timestamp: "2023-05-15T12:00:00Z",
    },
    {
      id: 2,
      name: "Bob",
      message: "I proposed to my wife here 20 years ago.",
      drawing: "/placeholder.svg?height=200&width=300",
      timestamp: "2023-05-14T15:30:00Z",
    },
  ])

  const addEntry = (name: string, message: string, drawing: string | null) => {
    const newEntry: Entry = {
      id: Date.now(),
      name: name || "Anonymous",
      message,
      drawing,
      timestamp: new Date().toISOString(),
    }

    setEntries([newEntry, ...entries])
  }

  return (
    <>
      <div className="border border-black rounded-xl p-8 bg-white mb-8 max-w-md mx-auto">
        <h2 className="text-2xl font-normal text-center mb-6 text-black">Leave a Memory</h2>
        <GuestbookForm onSubmit={addEntry} />
      </div>
      <GuestbookEntries entries={entries} />
    </>
  )
}

