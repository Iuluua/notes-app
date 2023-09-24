import "./Button.css";
import { useThemeClass } from "../../hooks/useThemeClass";

interface Props {
    content?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ content, className, onClick }: Props) => {
    const themeClass = useThemeClass("button");

    return (
        <button className={`button ${themeClass} ${className}`} onClick={(event) => onClick!(event)}>{content}</button>
    );
}