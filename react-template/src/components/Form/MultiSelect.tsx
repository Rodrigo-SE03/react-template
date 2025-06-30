import React, { useState } from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  options: Option[];
  infoTitle?: string;
  infoText?: string;
  customClass?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  selectedValues,
  onChange,
  options,
  infoTitle,
  infoText,
  customClass = "",
}) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-semibold">
        <label className="block">{label}</label>
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

      <div
        className={`border rounded p-2 space-y-1 bg-white text-gray-800 ${customClass}`}
      >
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
              className="accent-blue-600"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

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
};

export default MultiSelect;
