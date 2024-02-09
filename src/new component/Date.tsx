import React, { ChangeEvent } from "react";

interface DateInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({ name, value, onChange, required }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        type="date"
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

export default DateInput;
