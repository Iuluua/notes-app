import "./Button.css";
import { useThemeClass } from "../../hooks/useThemeClass";

interface Props {
    content: string;
    onClick: () => void;
}

export const Button = ({ content, onClick }: Props) => {
    const themeClass = useThemeClass("button");

    return (
        <button className={`button ${themeClass}`} onClick={onClick}>{content}</button>
    );
}