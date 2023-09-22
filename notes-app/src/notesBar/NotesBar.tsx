import { Button } from "../button/Button";
import { useThemeClass } from "../hooks/useThemeClass";
import { NoteTag } from "../noteTag/NoteTag";
import "./NotesBar.css";

export interface NoteType {
    id: number;
    title: string;
    description: string;
}

interface Props {
    notes: NoteType[];
    onClick: (id: number) => void;
    onClickNewNote: () => void;
}

export const NotesBar = ({ notes, onClick, onClickNewNote }: Props) => {
    const themeClass = useThemeClass("notes-bar");

    return (
        <div className={`notes-bar ${themeClass}`}>
            <Button onClick={onClickNewNote} content="New Note" />
            {notes.map((note: NoteType) => (
                <NoteTag key={note.id} title={note.title} onClick={() => onClick(note.id)} />
            ))}
        </div>
    );
}