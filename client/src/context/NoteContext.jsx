import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "CREATE_NOTES":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NoteContextProvider = ({ children }) => {
  const [state, dispatchNotes] = useReducer(notesReducer, {
    notes: null,
  });
  return (
    <NoteContext.Provider value={{ ...state, dispatchNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
