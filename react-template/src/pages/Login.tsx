import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../auth/Api";
import { InputField, SubmitButton } from "../components/Form";
import { setAccessToken } from "../auth/tokenManager";

function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        email: form.email,
        senha: form.senha,
      });

      setAccessToken(res.data.token);
      navigate("/");
    } catch (error: any) {
      if (!error.response) {
        // Backend offline → login mock
        if (form.email === "demo@local.com" && form.senha === "123456") {
          setAccessToken("mock-token");
          navigate("/");
        } else {
          setErro("Backend offline e credenciais locais inválidas.");
        }
      } else {
        setErro("Credenciais inválidas.");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
          placeholder="email@exemplo.com"
        />

        <InputField
          label="Senha"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          type="password"
          required
        />

        {erro && (
          <p className="text-sm text-red-600 mt-1">{erro}</p>
        )}

        <SubmitButton text="Entrar" customClass="w-full mt-2" />
      </form>
    </div>
  );
}

export default Login;