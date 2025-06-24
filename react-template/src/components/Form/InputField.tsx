import { useState, forwardRef, ChangeEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";
import AlertDialog from "../../AlertDialog/AlertDialog";

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
      <div className="flex items-center gap-2 font-semibold">
        <label htmlFor={id || name}>{label}</label>
        {infoTitle && infoText && (
          <button
            type="button"
            onClick={() => setShowHelpDialog(true)}
            className="text-gray-500 hover:text-gray-700"
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
        className={`p-2 border rounded text-gray-800 bg-white ${customClass}`}
      />

      {showHelpDialog && (
        <AlertDialog
          isOpen={showHelpDialog}
          titulo={infoTitle}
          mensagem={infoText}
          onClose={() => setShowHelpDialog(false)}
        />
      )}
    </div>
  );
});

export default InputField;