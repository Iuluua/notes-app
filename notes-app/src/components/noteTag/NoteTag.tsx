import { useThemeClass } from "../../hooks/useThemeClass";
import { Button } from "../button/Button";
import "./NoteTag.css";

interface Props {
    title: string;
    isFolderElement: boolean;
    isFolder: boolean;
    onClickNewFile?: () => void;
    onClickDeleteFolder?: () => void;
    onClick: () => void;
}

export const NoteTag = ({ title, isFolderElement, isFolder, onClickNewFile, onClickDeleteFolder, onClick }: Props) => {
    //Could be better:
    //useThemeClass could take however many arguments for return an array of classes
    const themeClass = useThemeClass("note-tag");
    const folderthemeClass = useThemeClass("folder");
    let classes = "note-tag-container";

    if (isFolder) {
        classes = `${classes} folder ${folderthemeClass}`;
    } else if (isFolderElement) {
        classes = `${classes} folder-element`;
    }

    const handleNewFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onClickNewFile!();
    }

    const handleDeleteFolder = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onClickDeleteFolder!();
    }

    return (
        <div className={`${classes} ${themeClass}`} onClick={onClick}>
            <p>{title}</p>
            {isFolder && 
            <div className="note-tag-buttons-container">
                <Button className="note-tag-button new-folder-button" onClick={handleNewFile}/>    
                <Button className="note-tag-button delete-folder-button" onClick={handleDeleteFolder}/>    
            </div>}
        </div>
    )
}