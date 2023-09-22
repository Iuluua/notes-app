import { useContext } from "react";
import "./SettingsPage.css";
import { SetThemeContext, ThemeEnum } from "../../components/themeContext/ThemeContext";
import { useThemeClass } from "../../hooks/useThemeClass";

export const SettingsPage = () => {
    const setTheme = useContext(SetThemeContext);
    const themeClass = useThemeClass("settings-title");
    const themeButtonClass = useThemeClass("theme-button");

    return (
        <div className="settings-container">
            <h1 className={`settings-title ${themeClass}`}>Settings</h1>
            <h2>Theme color</h2>
            <div className="theme-container">
                <button className={`theme-button pink-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Pink)}></button>
                <button className={`theme-button purple-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Purple)}></button>
                <button className={`theme-button blue-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Blue)}></button>
                <button className={`theme-button green-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Green)}></button>
                <button className={`theme-button orange-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Orange)}></button>
                <button className={`theme-button yellow-theme ${themeButtonClass}`} onClick={() => setTheme(ThemeEnum.Yellow)}></button>
            </div>
        </div>
    );
}