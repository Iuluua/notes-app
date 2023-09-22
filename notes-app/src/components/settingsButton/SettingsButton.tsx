import { useThemeClass } from "../../hooks/useThemeClass";
import "./SettingsButton.css";

interface Props {
    onClick: () => void;
}

export const SettingsButton = ({ onClick }: Props) => {
    const themeClass = useThemeClass("settings-button");

    return (
        <button className={`settings-button ${themeClass}`} onClick={onClick}></button>
    )
}