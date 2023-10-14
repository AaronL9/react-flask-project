import React, { useEffect, useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import axios from "axios";
// component
import NoteCard from "../components/NoteCard";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";
import { useLogout } from "../hooks/useLogout";
export default function Home() {
  const { notes, dispatchNotes } = useNotesContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);

  const dateCreated = (updatedAt) => {
    return new Date(updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/notes", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.data;
        dispatchNotes({ type: "SET_NOTES", payload: data });
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        await logout()
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="home">
        <h2>All Notes</h2>
        <div className="notes">
          {notes &&
            notes.map((note) => (
              <NoteCard
                key={note.note_id}
                title={note.title}
                body={note.description}
                id={note.note_id}
                date={dateCreated(note.date)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
