import { useState } from "react";
import React from "react";
import { useNotesContext } from "../hooks/useNotesContext";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import Button from "../components/Button";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NoteForm() {
  const { dispatchNotes } = useNotesContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const note = { title, description };

    try {
      const response = await axios.post("http://127.0.0.1:5000/addnotes", note, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setTitle("");
      setDescription("");
      dispatchNotes({ type: "CREATE_BLOG", payload: response.data });
      navigate("/");

    } catch (error) {
      console.log(error.response.data.message);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="create-note">
      <Note
        setBody={setDescription}
        setTitle={setTitle}
        title={title}
        body={description}
      />
      <Button type={"add"} source={"/add.svg"} text={"Add"} />
    </form>
  );
}
