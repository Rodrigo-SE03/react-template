import { useState, forwardRef } from "react";
import type { ChangeEvent } from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  id?: string;
  required?: boolean;
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(({
  label,
  name,
  value,
  onChange,
  options,
  id,
  required = false,
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
            onClick={() => setShowHelpDialog(true)}
            className="text-gray-500 hover:text-gray-700 border-none bg-transparent cursor-pointer p-0 ml-2"
          >
            <FaInfoCircle size={16} />
          </button>
        )}
      </div>

      <select
        ref={ref}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`p-2 border rounded text-gray-800 bg-white ${customClass}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <AlertDialog
          isOpen={showHelpDialog}
          titulo={infoTitle}
          mensagem={infoText || ""}
          onClose={() => setShowHelpDialog(false)}
      />
    </div>
  );
});

export default SelectInput;