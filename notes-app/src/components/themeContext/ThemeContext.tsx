import { ReactNode, createContext, useState } from "react";

export enum ThemeEnum {
    Pink = "pink",
    Purple = "purple",
    Blue = "blue",
    Green = "green",
    Orange = "orange",
    Yellow = "yellow"
}

interface Props {
    children: ReactNode;
}

export const ThemeContext = createContext(ThemeEnum.Pink);
export const SetThemeContext = createContext((theme: ThemeEnum) => {theme});//should be written better

export const ThemeProvider = ({ children }: Props) => {
    const [theme, setTheme] = useState(ThemeEnum.Pink);

    return (
        <ThemeContext.Provider value={theme}>
            <SetThemeContext.Provider value={setTheme}>
                {children}
            </SetThemeContext.Provider>
        </ThemeContext.Provider>
    );
}