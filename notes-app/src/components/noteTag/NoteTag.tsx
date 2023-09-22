import { useThemeClass } from "../../hooks/useThemeClass";
import "./NoteTag.css";

interface Props {
    title: string;
    onClick: () => void;
}

export const NoteTag = ({ title, onClick }: Props) => {
    const themeClass = useThemeClass("note-tag");

    return (
        <div className={`note-tag-container ${themeClass}`} onClick={onClick}>
            <p>{title}</p>
        </div>
    )
}