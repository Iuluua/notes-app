import { useThemeClass } from "../../hooks/useThemeClass";
import { Button } from "../button/Button";
import "./SettingsButton.css";

interface Props {
    onClick: () => void;
}

export const SettingsButton = ({ onClick }: Props) => {
    const themeClass = useThemeClass("settings-button");

    return (
        <Button className={`settings-button ${themeClass}`} onClick={onClick}/>
    );
}