import type { DataTableColumn, TableName } from "../../types/dataTable";

export const getColumns = (table_name: TableName) => {
    const columns: Record<TableName, DataTableColumn[]> = {
        "dispositivos": [
            { label: "Nome", key: "nome" },
            { label: "Potência", key: "potencia" },
            { label: "Quantidade", key: "qtd" },
            { label: "Fator de Potência", key: "fp" }
        ],
        "usuarios": [
            { label: "Nome", key: "nome" },
            { label: "Email", key: "email" },
            { label: "Telefone", key: "telefone" },
            { label: "Endereço", key: "endereco" }
        ]
    }

    const column = columns[table_name];
    return column;
}