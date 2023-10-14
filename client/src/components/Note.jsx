import React from "react";

export default function Note({ setTitle, setBody, title, body }) {
  return (
    <div className="page">
      <div className="margin"></div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required={true}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        placeholder="Note..."
        required={true  }
      ></textarea>
    </div>
  );
}
