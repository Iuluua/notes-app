import { Button } from "../button/Button";
import { useThemeClass } from "../../hooks/useThemeClass";
import { NoteTag } from "../noteTag/NoteTag";
import "./NotesBar.css";
import { NoteCategoryType, NotesFolder } from "../notesFolder/NotesFolder";

export interface NoteType {
    id: number;
    title: string;
    description: string;
}

interface Props {
    allNotes: NoteType[];
    notes?: (NoteType)[];
    notesCategories: NoteCategoryType[];
    onClickNewNote: () => void;
    onClickNewFolder: () => void;
    onNoteTagClick: (id: number) => void;
    onClickNewFile: (categoryId: number) => void;
    onClickDeleteFolder: (id: number) => void;
}

export const NotesBar = ({ allNotes, notes, notesCategories, onNoteTagClick, onClickNewNote, onClickNewFolder, onClickNewFile, onClickDeleteFolder }: Props) => {
    const themeClass = useThemeClass("notes-bar");

    return (
        <div className={`notes-bar ${themeClass}`}>
            <div className="buttons-container">
                <Button onClick={onClickNewNote} content="New Note" />
                <Button onClick={onClickNewFolder} content="New Folder" />
            </div>
            {notes?.map((note: NoteType) => (
                <NoteTag 
                    key={note.id} 
                    title={note.title} 
                    isFolderElement={false} 
                    isFolder={false}
                    onClick={() => onNoteTagClick(note.id)}
                 />
            ))}
            {notesCategories.map((category: NoteCategoryType) => (
                <NotesFolder
                    allNotes={allNotes} 
                    key={category.id} 
                    noteCategory={category} 
                    onNoteTagClick={(id: number) => onNoteTagClick(id)}
                    onClickNewFile={() => onClickNewFile(category.id)}
                    onClickDeleteFolder={onClickDeleteFolder}
                 />
            ))}
        </div>
    );
}