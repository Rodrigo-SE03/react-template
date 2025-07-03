import type { TableName } from "../../types/dataTable";

export const mockData: Record<TableName, any[]> = {
  usuarios: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    nome: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@exemplo.com`,
    telefone: `(11) 90000-00${i + 1}`,
    endereco: `Rua Exemplo, ${i + 1}00`,
    active: i % 2 === 0,
  })),
  dispositivos: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    nome: `Dispositivo ${i + 1}`,
    potencia: (i + 1) * 1.5,
    qtd: (i % 5) + 1,
    fp: (0.8 + 0.02 * i).toFixed(2),
  })),
  servicos: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    nome: `Serviço ${i + 1}`,
    ativo: i % 2 === 0,
    preco: (i + 1) * 10.0,
  }))
};