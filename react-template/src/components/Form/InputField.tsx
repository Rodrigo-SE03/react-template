import { useState, forwardRef } from "react";
import type { ChangeEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";
import AlertDialog from "../AlertDialog/AlertDialog";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name: string;
  required?: boolean;
  type?: string;
  min?: string | number;
  max?: string | number;
  placeholder?: string;
  maxLength?: number;
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  value,
  onChange,
  id,
  name,
  required = false,
  type = "text",
  min,
  max,
  placeholder = "",
  maxLength = 100,
  infoTitle,
  infoText,
  customClass = "",
}, ref) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center font-semibold">
        <label htmlFor={id || name}>{label}</label>
        {infoTitle && infoText && (
          <button
            type="button"
            title={`info-${name}`}
            onClick={() => setShowHelpDialog(true)}
            className="text-gray-500 hover:text-gray-700 border-none bg-transparent cursor-pointer p-0 ml-2"
          >
            <FaInfoCircle size={16} />
          </button>
        )}
      </div>

      <input
        ref={ref}
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`p-2 border rounded text-gray-800 autofill:bg-white autofill:text-gray-800 bg-white ${customClass}`}
      />

      <AlertDialog
        isOpen={showHelpDialog}
        titulo={infoTitle}
        mensagem={infoText || ""}
        onClose={() => setShowHelpDialog(false)}
      />
    </div>
  );
});

export default InputField;