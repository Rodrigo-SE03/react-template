export type DataTableColumn = {
  key: string;
  label: string;
  type?: "text" | "number" | "boolean" | "money";
}

export type TableName = "dispositivos" | "usuarios" | "servicos";