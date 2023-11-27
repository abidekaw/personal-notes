import React from "react";

function Button({ type, status, onClick, children }) {
  return (
    <button
      type={type ? type : "button"}
      className={status ? `note-item__${status}-button` : null}
      onClick={onClick ? onClick : null}
    >
      {children}
    </button>
  );
}

export default Button;
