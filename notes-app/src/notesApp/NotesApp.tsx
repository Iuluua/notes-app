import { useRef, useState } from "react";
import { NotesBar } from "../notesBar/NotesBar";
import { NotesDisplay } from "../notesDisplay/NotesDisplay";
import "./NotesApp.css";
import { NewNote, NoteWithoutId } from "../newNote/NewNote";
import { SettingsButton } from "../settingsButton/SettingsButton";
import { PopUp } from "../popUp/PopUp";
import { Settings } from "../settings/Settings";
import { useThemeClass } from "../hooks/useThemeClass";

enum StatusEnum {
    NoAction,
    ViewNote,
    NewNote,
    ViewSettings
}

export enum NoteStatusEnum {
    NoAction,
    Deleted,
    Saved
}

const DELETE_MESSAGE = "The note has been deleted";
const SAVE_MESSAGE = "The note has been saved";

export const NotesApp = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [selectedId, setSelectedId] = useState(0);
    const [status, setStatus] = useState(StatusEnum.NoAction);
    const [noteStatus, setNoteStatus] = useState(NoteStatusEnum.NoAction);
    const [newId, setNewId] = useState(10);
    const ref = useRef<HTMLDivElement>(null);
    const themeClass = useThemeClass("background");

    const selectedNote = notes.find(note => note.id === selectedId) || notes[0];

    const handleClick = (id: number) => {
        setSelectedId(id);
        setStatus(StatusEnum.ViewNote);
        setNoteStatus(NoteStatusEnum.NoAction);
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleNoteChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, prop: string) => {
        setNotes(notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    [prop]: e.target.value
                };
            } else {
                return note;
            }
        }))
    }

    const handleDelete = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.Deleted);
    }

    const handleNewNoteClick = () => {
        setStatus(StatusEnum.NewNote);
        setNoteStatus(NoteStatusEnum.NoAction);
    }

    const handleSaveNewNote = (note: NoteWithoutId) => {
        const newNote = {...note, id: newId};
        setNewId(newId + 1);
        setNotes([...notes, newNote]);
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.Saved);
    }

    const handleSettingsClick = () => {
        setStatus(StatusEnum.ViewSettings);
        setNoteStatus(NoteStatusEnum.NoAction);
    }

    return (
        <div className={`notes-app ${themeClass}`} ref={ref}>
            <NotesBar notes={notes} onClick={handleClick} onClickNewNote={handleNewNoteClick} />
            <SettingsButton onClick={handleSettingsClick} />
            {status === StatusEnum.ViewSettings && noteStatus === NoteStatusEnum.NoAction && <Settings />}
            {status === StatusEnum.ViewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NotesDisplay 
                id={selectedNote.id}
                title={selectedNote.title} 
                description={selectedNote.description} 
                onChangeTitle={(e) => handleNoteChange(selectedId, e, "title")}
                onChangeDescription={(e) => handleNoteChange(selectedId, e, "description")}
                onDelete={handleDelete}
            />}
            {status === StatusEnum.NewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NewNote onClick={handleSaveNewNote} />}
            {status === StatusEnum.NoAction && 
            <div className="pop-up-container">
                {noteStatus === NoteStatusEnum.NoAction && 
                <>
                    <h1>Welcome to the Notes App!</h1>
                    <h3>Click on a note to view it or press "New Note" to create a new one</h3>
                </>}
                {noteStatus === NoteStatusEnum.Saved && <PopUp message={SAVE_MESSAGE} />}
                {noteStatus === NoteStatusEnum.Deleted && <PopUp message={DELETE_MESSAGE} />}
            </div>}
        </div>
    );
}

const initialNotes = [
    {
      "id": 0,
      "title": "Meeting Agenda",
      "description": "Discuss project updates and upcoming deadlines with the team."
    },
    {
      "id": 1,
      "title": "Grocery List",
      "description": "Buy milk, eggs, bread, and fresh vegetables from the store."
    },
    {
      "id": 2,
      "title": "Travel Plans",
      "description": "Book flights and accommodations for the summer vacation in Europe."
    },
    {
      "id": 3,
      "title": "Programming Task",
      "description": "Implement a user authentication system for the website."
    },
    {
      "id": 4,
      "title": "Fitness Goals",
      "description": "Plan workout routines and set fitness goals for the month."
    },
    {
      "id": 5,
      "title": "Recipe Ideas",
      "description": "Explore new recipes for a family dinner this weekend."
    },
    {
      "id": 6,
      "title": "Book Recommendations",
      "description": "Ask friends for book recommendations to build a reading list."
    },
    {
      "id": 7,
      "title": "Project Timeline",
      "description": "Create a timeline for the upcoming software development project."
    },
    {
      "id": 8,
      "title": "Travel Bucket List",
      "description": "Compile a list of dream destinations for future vacations."
    },
    {
      "id": 9,
      "title": "Home Improvement",
      "description": "Plan renovations for the living room and kitchen areas."
    }
];