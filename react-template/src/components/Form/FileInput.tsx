import { useState, forwardRef } from "react";
import type { ChangeEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";
import AlertDialog from "../Modals/AlertDialog/AlertDialog";

interface FileInputProps {
  label: string;
  name: string;
  onChange: (e: { target: { name: string; value: File | null } }) => void;
  id?: string;
  required?: boolean;
  accept?: string;
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
  maxSizeMB?: number;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
  label,
  name,
  onChange,
  id,
  required = false,
  accept = "",
  infoTitle,
  infoText,
  customClass = "",
  maxSizeMB = 2,
}, ref) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const maxBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setError(`O arquivo ultrapassa o limite de ${maxSizeMB}MB.`);
        e.target.value = ""; // limpa input
        onChange({ target: { name, value: null } });
        return;
      }

      setError("");
      onChange({ target: { name, value: file } });
    } else {
      setError("");
      onChange({ target: { name, value: null } });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center font-semibold">
        <label htmlFor={id || name}>{label}</label>
        {infoTitle && infoText && (
          <button
            type="button"
            title={`info-${name}`}
            onClick={() => setShowHelpDialog(true)}
            className="ml-2 p-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <FaInfoCircle size={16} />
          </button>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        id={id || name}
        name={name}
        onChange={handleFileChange}
        required={required}
        accept={accept}
        className={`p-2 border rounded text-gray-800 bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 ${customClass}`}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}

      <AlertDialog
        isOpen={showHelpDialog}
        titulo={infoTitle}
        mensagem={infoText || ""}
        onClose={() => setShowHelpDialog(false)}
      />
    </div>
  );
});

export default FileInput;