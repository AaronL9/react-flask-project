import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// components
import Button from "../components/Button";
import Note from "../components/Note";
import SuccessMessg from "../components/SuccessMessg";
import { useAuthContext } from "../hooks/useAuthContext";

export default function NoteView() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };

  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/notes/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccessVisible(true);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = response.data;
        if (response.status === 200) {
          setTitle(data.title);
          setDescription(data.description);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchNote();
  }, []);
  return (
    <>
      <Note
        setBody={setDescription}
        setTitle={setTitle}
        title={title}
        body={description}
      />
      <div className="buttons">
        <Button
          source={"/delete.svg"}
          type={"delete"}
          text={"Delete"}
          action={handleDelete}
        />
        <Button
          source={"/update.svg"}
          type={"update"}
          text={"Update"}
          action={handleUpdate}
        />
      </div>
      {isSuccessVisible && (
        <SuccessMessg
          message={"Updated Succesfully"}
          onClose={handleCloseSuccess}
        />
      )}
    </>
  );
}
