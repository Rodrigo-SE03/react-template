import React, { useState } from "react";
import ReactSelect from "react-select";
import type { OnChangeValue } from "react-select";
import AlertDialog from "../Modals/AlertDialog/AlertDialog";
import { FaInfoCircle } from "react-icons/fa";
import type { Option } from "../../types/forms";

interface SelectInputProps {
  label: string;
  name: string;
  value: string | null; // Alterado para receber o valor primitivo do formulário.
  onChange: (event: { target: { name: string; value: string | null } }) => void; // Alterado para emitir um evento padronizado.
  options: Option[];
  infoTitle?: string;
  infoText?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label, name, value, onChange, options,
  infoTitle, infoText
}) => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  // Encontra o objeto da opção completa com base no valor recebido, para uso interno do react-select.
  const currentOption = options.find((opt) => opt.value === value) || null;

  // Normaliza o evento de saída para ser compatível com inputs nativos.
  const handleSelectChange = (selectedOption: OnChangeValue<Option, false>) => {
    const syntheticEvent = {
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : null,
      },
    };
    onChange(syntheticEvent); // Dispara o evento padronizado para o formulário.
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center font-semibold">
        <label htmlFor={name}>{label}</label>
        {infoTitle && infoText && (
          <button 
            type="button"
            onClick={() => setShowHelpDialog(true)}
            className="ml-2 p-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <FaInfoCircle size={16} />
          </button>
        )}
      </div>

      <ReactSelect
        inputId={name}
        name={name}
        value={currentOption}
        onChange={handleSelectChange}
        options={options}
        className="text-gray-800 bg-white border rounded"
        isClearable
        isSearchable
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

export default SelectInput;
