import React from "react";

const Button = (props) => {
  const { children, className } = props;
  return (
    <button
      style={{
        color: "white",
        background: "black",
        textTransform: "uppercase",
      }}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
