import { useThemeClass } from "../hooks/useThemeClass";
import "./PopUp.css"

interface Props {
    message: string;
}

export const PopUp = ({ message }: Props) => {
    const themeClass = useThemeClass("pop-up");

    return (
        <div className={`pop-up ${themeClass}`}>{message}</div>
    );
}