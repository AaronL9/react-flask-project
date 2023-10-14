import { NoteContext } from "../context/NoteContext";
import { useContext } from "react";

// create a hook function
export const useNotesContext = () => {
    // return the value of the NotesContext
    const context = useContext(NoteContext);

    if (!context) {
        throw Error('useNotsContext must be use inside an NotesContextProvider')
    }

    return context;
}




