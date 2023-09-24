import { useState } from "react";
import { NoteTag } from "../noteTag/NoteTag";
import { NoteType } from "../notesBar/NotesBar";
import "./NotesFolder.css";

export interface NoteCategoryType {
    id: number;
    name: string;
    notes: number[];
}

interface Props {
    allNotes: NoteType[];
    noteCategory: NoteCategoryType;
    onNoteTagClick: (id: number) => void;
    onClickNewFile: () => void;
    onClickDeleteFolder: (id: number) => void;
}

export const NotesFolder = ({ allNotes, noteCategory, onNoteTagClick, onClickNewFile, onClickDeleteFolder }: Props) => {
    const [showNotes, setShowNotes] = useState(false);

    return (
        <>
            <NoteTag 
                title={noteCategory.name} 
                isFolderElement={false}
                isFolder={true} 
                onClick={() => setShowNotes(!showNotes)}
                onClickNewFile={onClickNewFile}
                onClickDeleteFolder={() => onClickDeleteFolder(noteCategory.id)}
            />
            {showNotes && 
            <div className="notes-folder-container">
                {noteCategory.notes.map(id => {
                    const note = allNotes.find(note => note.id === id) || allNotes[0];
                    return <NoteTag key={note.id} title={note.title} isFolderElement isFolder={false} onClick={() => onNoteTagClick(note.id)} />
                })}
            </div>}
        </>
    );
}