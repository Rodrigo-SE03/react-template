import { useState, forwardRef } from "react";
import type { ChangeEvent } from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  name,
  checked,
  onChange,
  id,
  required = false,
  infoTitle,
  infoText,
  customClass = "",
}, ref) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        ref={ref}
        type="checkbox"
        id={id || name}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className={`w-5 h-5 accent-blue-600 ${customClass}`}
      />
      <label htmlFor={id || name} className="cursor-pointer select-none">
        {label}
      </label>
      {infoTitle && infoText && (
        <button
          type="button"
          onClick={() => setShowHelpDialog(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaInfoCircle size={16} />
        </button>
      )}

      {showHelpDialog && (
        <AlertDialog
          isOpen={showHelpDialog}
          titulo={infoTitle}
          mensagem={infoText || ""}
          onClose={() => setShowHelpDialog(false)}
        />
      )}
    </div>
  );
});

export default Checkbox;