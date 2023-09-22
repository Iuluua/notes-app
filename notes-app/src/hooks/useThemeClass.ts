import { useContext } from "react";
import { ThemeContext, ThemeEnum } from "../components/themeContext/ThemeContext";

export const useThemeClass = (className: string) => {
    const theme = useContext(ThemeContext);

    if (theme === ThemeEnum.Pink) {
        return `pink-${className}`;
    }

    if (theme === ThemeEnum.Purple) {
        return `purple-${className}`;
    }

    if (theme === ThemeEnum.Blue) {
        return `blue-${className}`;
    }
    
    if (theme === ThemeEnum.Green) {
        return `green-${className}`;
    }

    if (theme === ThemeEnum.Orange) {
        return `orange-${className}`;
    }

    if (theme === ThemeEnum.Yellow) {
        return `yellow-${className}`;
    }
}