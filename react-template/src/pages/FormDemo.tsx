import React, { useState } from "react";
import { InputField, TextAreaInput, MultiSelect, SelectInput, Checkbox, SubmitButton } from "../components/Form";

function FormDemo() {
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    descricao: "",
    categoria: null,
    termos: false,
    tags: [] as string[],
  });

  const handleChange = (e: { target: { name: string; value: any; type?: string; checked?: boolean } }) => {
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
    <div className="max-w-3xl mx-auto items-center justify-center flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">Formulário de Demonstração</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">

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

        <MultiSelect
          label="Tags"
          name="tags"
          values={formData.tags}
          onChange={handleChange}
          options={[
            { value: "frontend", label: "Frontend" },
            { value: "backend", label: "Backend" },
            { value: "infra", label: "Infraestrutura" },
            { value: "fullstack", label: "Fullstack" },
          ]}
          infoTitle="Tecnologias"
          infoText="Você pode selecionar múltiplas áreas de interesse."
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

        <SubmitButton text="Enviar" customClass="w-full" />

      </form>
    </div>
  );
}

export default FormDemo;