import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NoteContextProvider } from "./context/NoteContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
