import MainTable from "../components/DataTable/MainTable";

function TablePage() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Exemplo do componente DataTable</h1>
      <p className="text-lg text-gray-100">Esse componente é uma tabela interativa que permite visualizar, adicionar, editar e remover registros.</p>
      <MainTable
        tableName="servicos"
      />
    </div>
  );
}

export default TablePage;