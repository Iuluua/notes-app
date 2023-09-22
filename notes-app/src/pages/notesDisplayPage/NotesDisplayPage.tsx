import { Button } from "../../components/button/Button";
import { useThemeClass } from "../../hooks/useThemeClass";
import "./NotesDisplayPage.css";

interface Props {
    id: number;
    title: string;
    description: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onDelete: (id: number) => void;
}

export const NotesDisplayPage = ({ id, title, description, onChangeTitle, onChangeDescription, onDelete }: Props) => {
    const themeClass = useThemeClass("note-input");

    return (
        <div className="notes-display">
            <input 
                className={`note-input ${themeClass}`}
                type="text" 
                value={title} 
                onChange={onChangeTitle} 
            />
            <textarea 
                className={`note-input ${themeClass}`}
                cols={30} 
                rows={10} 
                value={description} 
                onChange={onChangeDescription}
            />
            <Button content="Delete Note" onClick={() => onDelete(id)} />
        </div>
    );
}