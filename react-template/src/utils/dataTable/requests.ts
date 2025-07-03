import api from "../../auth/Api";
import { mockData } from "./mockData";
import type { TableName } from "../../types/dataTable";

export const carregarDados = async (tableName: TableName): Promise<any[]> => {
  try {
    const res = await api.get(`/${tableName}`);
    return res.data;
  } catch (err) {
    console.warn(`Erro ao buscar dados reais da tabela "${tableName}", usando dados mock.`);
    return mockData[tableName] || [];
  }
};

export const adicionarRegistro = async (table: TableName, dados: any) => {
  const response = await api.post(`/${table}`, dados);
  return response.data;
};

export const editarRegistro = async (table: TableName, id: string, dados: any) => {
  const response = await api.put(`/${table}/${id}`, dados);
  return response.data;
};

export const removerRegistro = async (table: TableName, id: string) => {
  const response = await api.delete(`/${table}/${id}`);
  return response.data;
};
