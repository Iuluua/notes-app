import { useState } from "react";
import "../notesDisplayPage/NotesDisplayPage.css";
import { Button } from "../../components/button/Button";
import { useThemeClass } from "../../hooks/useThemeClass";

export interface NoteWithoutId {
    title: string;
    description: string;
}

interface Props {
    onClick: (note: NoteWithoutId) => void;
}

export const NewNotePage = ({ onClick }: Props) => {
    const [newNote, setNewNote] = useState({
        "title": "New Note",
        "description": "Write your note here"
    })
    const themeClass = useThemeClass("note-input");

    return (
        <div className="notes-display">
            <input 
                className={`note-input ${themeClass}`}
                type="text" 
                value={newNote.title} 
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
            />
            <textarea 
                className={`note-input ${themeClass}`}
                cols={30} rows={10} 
                value={newNote.description} 
                onChange={(e) => setNewNote({...newNote, description: e.target.value})}
            />
            <Button content="Save Note" onClick={() => onClick(newNote)} />
        </div>
    );
};
