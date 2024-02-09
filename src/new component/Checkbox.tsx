import React, { ChangeEvent } from "react";

interface CheckboxProps {
  name: string;
  checkbox: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, checkbox, onChange }) => {
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={name}
        name={name}
        checked={checkbox}
        onChange={onChange}
      />
      <label className="form-check-label ml-1" htmlFor={name}>
        {name}
      </label>
    </div>
  );
};

export default Checkbox;

