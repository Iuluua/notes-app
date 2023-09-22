import { useRef, useState } from "react";
import { NotesBar } from "../components/notesBar/NotesBar";
import { NotesDisplayPage } from "../pages/notesDisplayPage/NotesDisplayPage";
import "./NotesApp.css";
import { NewNotePage, NoteWithoutId } from "../pages/newNotePage/NewNotePage";
import { SettingsButton } from "../components/settingsButton/SettingsButton";
import { PopUp } from "../components/popUp/PopUp";
import { SettingsPage } from "../pages/settingsPage/SettingsPage";
import { useThemeClass } from "../hooks/useThemeClass";
import data from "../data/data.json";

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
    const [notes, setNotes] = useState(data.notes);
    const [selectedId, setSelectedId] = useState(0);
    const [status, setStatus] = useState(StatusEnum.NoAction);
    const [noteStatus, setNoteStatus] = useState(NoteStatusEnum.NoAction);
    const [nextId, setNextId] = useState(10);
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
        const newNote = {...note, id: nextId};
        setNextId(nextId + 1);
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
            {status === StatusEnum.ViewSettings && noteStatus === NoteStatusEnum.NoAction && <SettingsPage />}
            {status === StatusEnum.ViewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NotesDisplayPage 
                id={selectedNote.id}
                title={selectedNote.title} 
                description={selectedNote.description} 
                onChangeTitle={(e) => handleNoteChange(selectedId, e, "title")}
                onChangeDescription={(e) => handleNoteChange(selectedId, e, "description")}
                onDelete={handleDelete}
            />}
            {status === StatusEnum.NewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NewNotePage onClick={handleSaveNewNote} />}
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