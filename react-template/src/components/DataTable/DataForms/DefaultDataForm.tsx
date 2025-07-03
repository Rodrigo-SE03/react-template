import { useState, useEffect } from "react";
import InputField from "../../Form/InputField";
import Checkbox from "../../Form/Checkbox";
import SubmitButton from "../../Form/SubmitButton";
import type { DataTableColumn } from "../../../types/dataTable";

interface DefaultDataFormProps {
  columns: DataTableColumn[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
}

const DefaultDataForm: React.FC<DefaultDataFormProps> = ({
  columns,
  initialData = {},
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    const base: Record<string, any> = {};
    columns.forEach(({ key, type }) => {
      base[key] = initialData[key] ?? (type === "boolean" ? false : "");
    });
    setForm(base);
  }, [columns, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {columns.map(({ key, label, type }) => {
        const value = form[key];

        if (type === "boolean") {
          return (
            <Checkbox
              key={key}
              name={key}
              label={label}
              checked={!!value}
              onChange={handleChange}
            />
          );
        }

        return (
          <InputField
            key={key}
            name={key}
            label={label}
            value={value}
            onChange={handleChange}
            type={type === "number" ? "number" : "text"}
          />
        );
      })}

      <div className="flex justify-between gap-4 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        )}
        <SubmitButton text="Salvar" />
      </div>
    </form>
  );
};

export default DefaultDataForm;