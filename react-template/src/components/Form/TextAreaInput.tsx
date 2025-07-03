import { useState, forwardRef } from "react";
import type { ChangeEvent } from "react";
import AlertDialog from "../Modals/AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";

interface TextAreaInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(({
  label,
  value,
  onChange,
  name,
  id,
  required = false,
  placeholder = "",
  maxLength = 300,
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

      <textarea
        ref={ref}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`min-h-12 max-h-64 p-2 border rounded resize-y text-gray-800 bg-white ${customClass}`}
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

export default TextAreaInput;