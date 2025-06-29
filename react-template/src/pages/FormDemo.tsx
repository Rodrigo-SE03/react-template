import React, { useState } from "react";
import InputField from "../components/Form/InputField";
import TextAreaInput from "../components/Form/TextAreaInput"
import SelectInput from "../components/Form/SelectInput";
// import Checkbox from "../components/Form/Checkbox";
// import SubmitButton from "../components/Form/SubmitButton";

function FormDemo() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    termos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

        {/* <Checkbox
          label="Aceito os termos"
          name="termos"
          checked={formData.termos}
          onChange={handleChange}
        /> */}

        {/* <SubmitButton text="Enviar" /> */}

      </form>
    </div>
  );
}

export default FormDemo;