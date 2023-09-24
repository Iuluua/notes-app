import { useState } from "react";
import { useThemeClass } from "../../hooks/useThemeClass";
import { Button } from "../button/Button";
import "./PopUp.css";

interface Props {
    message: string;
    isFolderDelete?: boolean;
    isFolderAdd?: boolean;
    onClick?: (deleted: boolean) => void;
    onClickNewFolder?: (foldername: string) => void;
}

export const PopUp = ({ message, isFolderDelete, isFolderAdd, onClick, onClickNewFolder }: Props) => {
    const [folderName, setFolderName] = useState("");
    const themeClass = useThemeClass("pop-up");
    const addFolderThemeClass = useThemeClass("add-folder-input");

    return (
        <div className={`pop-up ${themeClass}`}>
            <p>{message}</p>
            {isFolderDelete && 
            <div className="options-button-container">
                <Button className="options-button" content="YES" onClick={() => onClick!(true)} />
                <Button className="options-button" content="NO" onClick={() => onClick!(false)} />
            </div>}
            {isFolderAdd &&
            <div className="add-folder-container">
                <input 
                    className={`add-folder-input ${addFolderThemeClass}`} 
                    value={folderName} 
                    onChange={(e) => setFolderName(e.target.value)} 
                    type="text" />
                <Button className="add-folder-button" content="Save" onClick={() => onClickNewFolder!(folderName)} />
            </div>}
        </div>
    );
}