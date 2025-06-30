import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import TextAreaInput from "../components/Form/TextAreaInput"
import SelectInput from "../components/Form/SelectInput";
import Checkbox from "../components/Form/Checkbox";
import SubmitButton from "../components/Form/SubmitButton";
import MultiSelect from "../components/Form/MultiSelect";

function FormDemo() {
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    descricao: "",
    categoria: "",
    termos: false,
    tags: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Formulário de Demonstração</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          infoTitle="Nome do usuário"
          infoText="Por favor, insira seu nome completo."
          required
        />

        <InputField
          label="Data"
          name="data"
          type="date"
          value={formData.data}
          onChange={handleChange}
          infoTitle="Nome do usuário"
          infoText="Por favor, insira seu nome completo."
          required
        />

        <TextAreaInput
          label="Descrição"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        />

        <SelectInput
          label="Categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          options={[
            { value: "", label: "Selecione" },
            { value: "opcao1", label: "Opção 1" },
            { value: "opcao2", label: "Opção 2" },
          ]}
        />

        <Checkbox
          label="Aceito os termos"
          name="termos"
          checked={formData.termos}
          onChange={handleChange}
        />

        <MultiSelect
          label="Tags"
          name="tags"
          selectedValues={formData.tags}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, tags: val }))
          }
          options={[
            { value: "frontend", label: "Frontend" },
            { value: "backend", label: "Backend" },
            { value: "fullstack", label: "Fullstack" },
          ]}
          infoTitle="Categorias"
          infoText="Você pode escolher mais de uma categoria para este item."
        />

        <SubmitButton text="Enviar" customClass="w-full" />

      </form>
    </div>
  );
}

export default FormDemo;