import React from "react";

const PrimaryButton = ({
  disabled,
  border,
  background,
  label,
  color,
  handleClick,
  customStyle,
  startIcon,
  endIcon,
}) => {
  return (
    <button
      type="button"
      className={`${
        customStyle ? customStyle : "w-full"
      } py-3 rounded-[10px] flex items-center justify-center cursor-pointer`}
      style={{
        background: disabled ? "var(--text-gray)" : background,
        color: color,
        border: disabled ? "var(--border-gray)" : border,
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      {startIcon}
      {label}
      {endIcon}
    </button>
  );
};

export default PrimaryButton;
