import React, { ChangeEvent } from "react";

interface TextProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Text: React.FC<TextProps> = ({ name, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Text;
