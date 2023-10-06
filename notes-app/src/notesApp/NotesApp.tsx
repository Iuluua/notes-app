import { useRef, useState } from "react";
import { NotesBar } from "../components/notesBar/NotesBar";
import { NotesDisplayPage } from "../pages/notesDisplayPage/NotesDisplayPage";
import "./NotesApp.css";
import { NewNotePage, NoteWithoutId } from "../pages/newNotePage/NewNotePage";
import { SettingsButton } from "../components/settingsButton/SettingsButton";
import { PopUp } from "../components/popUp/PopUp";
import { SettingsPage } from "../pages/settingsPage/SettingsPage";
import { useThemeClass } from "../hooks/useThemeClass";
import data from "../data/data.json";
import { NoteCategoryType } from "../components/notesFolder/NotesFolder";

enum StatusEnum {
    NoAction,
    ViewNote,
    NewNote,
    NewFolder,
    ViewSettings
}

export enum NoteStatusEnum {
    NoAction,
    FileDeleted,
    IsFolderDeleted,
    FolderDeleted,
    FileSaved,
    FolderSaved
}

const FILE_DELETE_MESSAGE = "The note has been deleted";
const FOLDER_DELETE_MESSAGE = "The folder has been deleted";
const IS_FOLDER_DELETE_MESSAGE = "Are you sure you want to delete this folder?";
const FILE_SAVE_MESSAGE = "The note has been saved";
const FOLDER_SAVE_MESSAGE = "The folder has been saved";
const ADD_FOLDER_MESSAGE = "Write down the folder name";

export const NotesApp = () => {
    //the data.json file categories ids should start with 0
    const [allNotes, setAllNotes] = useState(data.notes);
    const [notesWithoutCategory, setNotesWithoutCategory] = useState(data.notesWithoutCategories);
    const [notesCategories, setNotesCategories] = useState(data.categories);
    const [selectedNoteTagId, setSelectedNoteTagId] = useState(0);
    const [status, setStatus] = useState(StatusEnum.NoAction);
    const [noteStatus, setNoteStatus] = useState(NoteStatusEnum.NoAction);
    const [nextId, setNextId] = useState(15);
    const [nextFolderId, setNextFolderId] = useState(6)
    const [folderToDeleteId, setFolderToDeleteId] = useState(0);
    const [isNoteWithoutCategory, setIsNoteWithoutCategory] = useState(true);
    const [categoryToSaveInId, setCategoryToSaveInId] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const themeClass = useThemeClass("background");

    const selectedNote = allNotes.find(note => note.id === selectedNoteTagId) || allNotes[0];

    //Must be done better!
    const visibleNotesButNotGoodWithTs = notesWithoutCategory.map(id => allNotes.find(note => note.id === id));
    const visibleNotes = visibleNotesButNotGoodWithTs.map((note, index) => {
        if (typeof note === "undefined") {
            return allNotes[index];
        }
        return note;
    })

    const handleNoteTagClick = (id: number) => {
        setSelectedNoteTagId(id);
        setStatus(StatusEnum.ViewNote);
        setNoteStatus(NoteStatusEnum.NoAction);
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleNoteChange = (id: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, prop: string) => {
        setAllNotes(allNotes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    [prop]: e.target.value
                };
            } else {
                return note;
            }
        }))
    }

    const handleDelete = (id: number) => {
        setAllNotes(allNotes.filter(note => note.id !== id));
        setNotesWithoutCategory(notesWithoutCategory.filter(noteId => noteId !== id));
        setNotesCategories(notesCategories.map(category => {
            category.notes = category.notes.filter(noteId => noteId !== id);
            return category;
        }));
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.FileDeleted);
    }

    const handleFolderDeleteShow = (id: number) => {
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.IsFolderDeleted);
        setFolderToDeleteId(id);
    }

    const handleFolderDelete = (deleted: boolean) => {
        if (deleted) {
            setNotesCategories(notesCategories.filter(category => category.id !== folderToDeleteId));
            setNoteStatus(NoteStatusEnum.FolderDeleted);
            setStatus(StatusEnum.NoAction);
        } else {
            setNoteStatus(NoteStatusEnum.NoAction);
            setStatus(StatusEnum.NoAction);
        }
    }

    const handleNewNoteClick = (isNoteWithoutCategory: boolean, categoryId?: number) => {
        if (categoryId) {
            setCategoryToSaveInId(categoryId);
        }
        setIsNoteWithoutCategory(isNoteWithoutCategory);
        setStatus(StatusEnum.NewNote);
        setNoteStatus(NoteStatusEnum.NoAction);
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleSaveNewNote = (note: NoteWithoutId, isNoteWithoutCategory: boolean) => {
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.FileSaved);

        const newNote = {...note, id: nextId};
        setNextId(nextId + 1);
        setAllNotes([...allNotes, newNote]);

        if (isNoteWithoutCategory) {
            setNotesWithoutCategory([...notesWithoutCategory, newNote.id]);
            return;
        } 

        const categoryToSaveIn = notesCategories.find(category => category.id === categoryToSaveInId);
        if (categoryToSaveIn) {
            const newCategory = {...categoryToSaveIn, notes: [...categoryToSaveIn.notes, nextId]};
            console.log(categoryToSaveIn, newCategory)

            setNotesCategories(notesCategories.map(category => {
                if (category.id === categoryToSaveInId) {
                    return newCategory;
                }
                return category;
            }));
        }   
    }

    const handleSettingsClick = () => {
        setStatus(StatusEnum.ViewSettings);
        setNoteStatus(NoteStatusEnum.NoAction);
    }

    const handleNewFolderClick = () => {
        setStatus(StatusEnum.NewFolder);
        setNoteStatus(NoteStatusEnum.NoAction);
    }

    const handleSaveFolder = (folderName: string) => {
        const newCategory: NoteCategoryType = {
            id: nextFolderId,
            name: folderName,
            notes: []
        };
        setNextFolderId(nextFolderId + 1);

        setNotesCategories([...notesCategories, newCategory]);
        setStatus(StatusEnum.NoAction);
        setNoteStatus(NoteStatusEnum.FolderSaved);
    }

    return (
        <div className={`notes-app ${themeClass}`} ref={ref}>
            <NotesBar 
                allNotes={allNotes}
                notes={visibleNotes} 
                notesCategories={notesCategories} 
                onNoteTagClick={handleNoteTagClick} 
                onClickNewNote={() => handleNewNoteClick(true)}
                onClickNewFolder={handleNewFolderClick}
                onClickNewFile={(categoryId) => handleNewNoteClick(false, categoryId)} 
                onClickDeleteFolder={handleFolderDeleteShow}
            />
            <SettingsButton onClick={handleSettingsClick} />
            {status === StatusEnum.ViewSettings && noteStatus === NoteStatusEnum.NoAction && <SettingsPage />}
            {status === StatusEnum.ViewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NotesDisplayPage 
                id={selectedNote.id}
                title={selectedNote.title} 
                description={selectedNote.description} 
                onChangeTitle={(e) => handleNoteChange(selectedNoteTagId, e, "title")}
                onChangeDescription={(e) => handleNoteChange(selectedNoteTagId, e, "description")}
                onDelete={handleDelete}
            />}
            {status === StatusEnum.NewNote && noteStatus === NoteStatusEnum.NoAction &&
            <NewNotePage onClick={(note) => handleSaveNewNote(note, isNoteWithoutCategory)} />}
            {status === StatusEnum.NewFolder && noteStatus === NoteStatusEnum.NoAction && 
            <div className="pop-up-container">
                <PopUp message={ADD_FOLDER_MESSAGE} isFolderAdd onClickNewFolder={handleSaveFolder} />    
            </div>}
            {status === StatusEnum.NoAction && 
            <div className="pop-up-container">
                {noteStatus === NoteStatusEnum.NoAction && 
                <>
                    <h1>Welcome to the Notes App!</h1>
                    <h3>Click on a note to view it or press "New Note" to create a new one</h3>
                </>}
                {noteStatus === NoteStatusEnum.FileSaved && <PopUp message={FILE_SAVE_MESSAGE} />}
                {noteStatus === NoteStatusEnum.FolderSaved && <PopUp message={FOLDER_SAVE_MESSAGE} />}
                {noteStatus === NoteStatusEnum.FileDeleted && <PopUp message={FILE_DELETE_MESSAGE} />}
                {noteStatus === NoteStatusEnum.IsFolderDeleted && 
                <PopUp message={IS_FOLDER_DELETE_MESSAGE} isFolderDelete onClick={handleFolderDelete} />}
                {noteStatus === NoteStatusEnum.FolderDeleted && <PopUp message={FOLDER_DELETE_MESSAGE} />}
            </div>}
        </div>
    );
}