import React, { useState } from "react";
import ReactSelect from "react-select";
import type { OnChangeValue } from "react-select";
import AlertDialog from "../AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";
import type { Option } from "../../types/forms";

interface MultiSelectProps {
  label: string;
  name: string;
  values: string[]; // ← apenas os valores (strings)
  onChange: (event: { target: { name: string; value: string[] } }) => void;
  options: Option[];
  infoTitle?: string;
  infoText?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  name,
  values,
  onChange,
  options,
  infoTitle,
  infoText
}) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  // Converte os valores primitivos para os objetos do react-select
  const selectedOptions = options.filter((opt) => values.includes(opt.value));

  const handleMultiChange = (selected: OnChangeValue<Option, true>) => {
    const newValues = selected ? selected.map((opt) => opt.value) : [];
    const syntheticEvent = {
      target: {
        name,
        value: newValues,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center font-semibold">
        <label htmlFor={name}>{label}</label>
        {infoTitle && infoText && (
          <button onClick={() => setShowHelpDialog(true)}
                  className="ml-2 p-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700">
            <FaInfoCircle size={16} />
          </button>
        )}
      </div>

      <ReactSelect
        closeMenuOnSelect={false}
        inputId={name}
        name={name}
        value={selectedOptions}
        onChange={handleMultiChange}
        options={options}
        isMulti
        isClearable
        isSearchable
        className="text-gray-800 bg-white border rounded"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: 'black',
            primary25: '#2f94ff',
            primary: '#2f94ff',
          },
        })}
      />

      <AlertDialog
        isOpen={showHelpDialog}
        titulo={infoTitle}
        mensagem={infoText || ""}
        onClose={() => setShowHelpDialog(false)}
      />
    </div>
  );
};

export default MultiSelect;
