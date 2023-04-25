import { useEffect, useState } from 'react'
import './App.css'
import notesArr from './assets/notes.jsx'
import axios from "axios"
import noteService from './services/data.jsx'

function App() {
  const [notes, setNotes] = useState("")
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [deleteNote, setDeleteNote] = useState('')

  useEffect(() => {
    noteService
      .GetAll()
      .then(notes => {
        setNotes(notes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    noteService
      .Create(noteObject)
      .then(note => {
        setNotes(notes.concat(note))
        setNewNote('')
      })
  }

  const deleteNoteFunction = (event) => {
    event.preventDefault()
    noteService
      .Delete(deleteNote)
      .then(note => {
        const newNotes = notes.filter(note => note._id !== deleteNote)
        setNotes(newNotes)
        setDeleteNote('')
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const handleDeleteNote = (event) => {
    setDeleteNote(event.target.value)
  }
  const handleValue = (event) => {
    setDeleteNote(event.target.id)
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n._id === id)
    const changedNote = { ...note, important: !note.important }
    setNotes(notes.map(note => note._id !== id ? note : changedNote))
    noteService.Update(id, changedNote)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <>
      {
        notes != "" &&
        <div className="App">
          <h1>Notes</h1>
          <div>
            <button style={{
              marginLeft: '0px',
            }}  onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {
              notesToShow.map(note => {
                console.log(notesToShow);
                const label = note.important ? 'make not important' : 'make important'
                return (
                  <li key={note._id} className='li'>
                    <div onClick={handleValue} id={note._id}>{note.content}</div>
                    <button onClick={() => toggleImportance(note._id)}>{label}</button>
                  </li>
                )
              })}
          </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} type="text" />
            <button type="submit">Add note</button>
          </form>
          <form onSubmit={deleteNoteFunction} className='formdelete'>
            <input type="text" value={deleteNote} onChange={handleDeleteNote} readOnly />
            <button type="submit">Delete note</button>
            <p className='deleteP'>Click in note to copy ID</p>
          </form>
        </div>
      }
    </>
  )
}

export default App
