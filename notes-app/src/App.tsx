import './App.css';
import { NotesApp } from './notesApp/NotesApp';
import { ThemeProvider } from './themeContext/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  );
}

export default App
//new features for the Borsuk client 
// 1. Add folders to the notes
// 2. Drag and drop notes around
// 3. Add images and drag them around in the notes