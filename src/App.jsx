import { useEffect, useState } from 'react'
import './App.css'
import notesArr from './assets/notes.jsx'
import axios from "axios"
import noteService from './services/data.jsx'
import Loader from './loader.jsx'

function App() {
  const [home, setHome] = useState(true)
  const [notes, setNotes] = useState("")
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [deleteNote, setDeleteNote] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    noteService
      .GetAll()
      .then(notes => {
        setNotes(notes)
        setLoader(true)
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
  const handleDelete = (event) => {
    setDeleteNote(event.target.id)
  }

  const toggleImportance = (id) => {
    const note = notes.find(n => n._id === id)
    const changedNote = { ...note, important: !note.important }
    setNotes(notes.map(note => note._id !== id ? note : changedNote))
    noteService.Update(id, changedNote)
  }

  const classLifunction = (note) => {
    if (note.important) {
      if (deleteNote === note._id) {
        return 'li li-important li-select'
      }
      return 'li li-important'
    }
    if (deleteNote === note._id) {
      return 'li li-select'
    }
    return 'li'
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleHome = () => {
    if (home) {
      return (
        <div className="Home" >
          <h1>Notes</h1>
          <p>This is an application made with React.js and MongoDB about a crud of Notes</p>
          <p style={{
            fontSize: '22px',
            fontWeight: 'bold'
          }}>(may take a while to load)</p>
          <button onClick={() => setHome(false)} className='btn-home'>
            Start
          </button>
        </div >
      )
    } else {
      return (
        <>
          {
            loader ?
              <div className="App">
                <div className='title'>
                  <h1>Notes</h1>
                  <div>
                    <button style={{
                      marginLeft: '0px',
                    }} onClick={() => setShowAll(!showAll)}>
                      show {showAll ? 'important' : 'all'}
                    </button>
                  </div>
                </div>
                <ul>
                  {
                    notesToShow.map(note => {
                      const label = note.important ? 'make not important' : 'make important'
                      const classLi = classLifunction(note)
                      return (
                        <li key={note._id} className={classLi} >
                          <div onClick={handleDelete} id={note._id}>{note.content}</div>
                          <button onClick={() => toggleImportance(note._id)}>{label}</button>
                        </li>
                      )
                    })}
                </ul>
                <form onSubmit={addNote}>
                  <input value={newNote} onChange={handleNoteChange} type="text" />
                  <button className='btn-add' type="submit">Add note</button>
                </form>
                <div>
                  <button onClick={deleteNoteFunction} className='btn-delete'>
                    Delete note
                  </button>
                  <p className='commentDelete'>click on a note to delete</p>
                </div>
                <div>
                  <button onClick={() => setHome(true)} className='btn-home btn-home-main'>
                    Home
                  </button>
                </div>
              </div>
              : <Loader />
          }
        </>
      )
    }
  }
  const footerClass = home ? 'footer' : 'footer-main'
  return (
    <>
      <div className='MainAPP'>
        {handleHome()}
      </div>
      <footer className={footerClass}>
        <p>Hecho y diseñado por <a href="https://www.linkedin.com/in/alejo-lacroix/" target="_blank" rel="noreferrer">Alejo Lacroix</a> </p>
        <div className="social">
          <a target="_blank" href="https://github.com/alejolac/Notes-Front-End"><i className="fa-brands fa-github"></i></a>
          <a target="_blank" href="https://www.linkedin.com/in/alejo-lacroix/"><i className="fa-brands fa-linkedin"></i></a>
        </div>
      </footer>
    </>
  )
}


export default App
