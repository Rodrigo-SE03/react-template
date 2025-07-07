import { useEffect, useState } from "react";
import { getColumns } from "../../utils/dataTable/columns";
import { carregarDados, adicionarRegistro, editarRegistro, removerRegistro } from "../../utils/dataTable/requests";
import AlertDialog from "../Modals/AlertDialog/AlertDialog";
import ConfirmDialog from "../Modals/ConfirmDialog/ConfirmDialog";
import DefaultRow from "./Rows/DefaultRow";
import DefaultDataForm from "./DataForms/DefaultDataForm";
import Modal from "../Modals/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import type { DataTableColumn, TableName } from "../../types/dataTable";

interface MainTableProps {
  tableName: TableName;
  editable?: boolean;
  removable?: boolean;
}

const MainTable: React.FC<MainTableProps> = ({
  tableName,
  editable = true,
  removable = true,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<DataTableColumn[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({isOpen: false, message: "", title: ""});
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dados = await carregarDados(tableName);
        console.log("Dados carregados:", dados);
        setData(dados);
        setColumns(getColumns(tableName) || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setAlertInfo({
          isOpen: true,
          message: "Erro ao carregar os dados. Verifique o console para mais detalhes.",
          title: "Erro",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName]);

  const handleAddSubmit = async (formData: any) => {
    try {
      const novo = await adicionarRegistro(tableName, formData);
      setData((prev) => [...prev, novo]);
      setIsAddModalOpen(false);
    } catch (error) {
      setIsAddModalOpen(false);
      console.error("Erro ao adicionar:", error);
      setAlertInfo({
        isOpen: true,
        message: "Erro ao adicionar o registro.",
        title: "Erro",
      });
    }
  };

  const handleEditClick = (item: any) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (formData: any) => {
    try {
      const updated = await editarRegistro(tableName, editingItem.id, formData);
      setData((prev) =>
        prev.map((row) => (row.id === editingItem.id ? updated : row))
      );
      setIsEditModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Erro ao editar:", error);
      setIsEditModalOpen(false);
      setAlertInfo({
        isOpen: true,
        message: "Erro ao editar o registro.",
        title: "Erro",
      });
    }
  };


  const handleRemoveClick = (item: any) => {
    setItemToDelete(item);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await removerRegistro(tableName, itemToDelete.id);
    } catch (error) {
      console.error("Erro ao remover registro:", error);
      setConfirmDeleteOpen(false);
      setAlertInfo({
        isOpen: true,
        message: "Erro ao remover o registro. Verifique o console para mais detalhes.",
        title: "Erro",
      });
      return;
    }
    console.log("Removido:", itemToDelete);
    setData((prev) => prev.filter((row) => row.id !== itemToDelete.id));
    setItemToDelete(null);
    setConfirmDeleteOpen(false);
  };

  return (
    <>
    {loading ? (
        <div className="p-6">
          <LoadingSpinner size={50} text="Carregando" />
        </div>
      ) : (
    <>
    <div className={`overflow-x-auto mt-6 ${!loading && "border border-gray-300 rounded-md"}`}>
      
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  {col.label}
                </th>
              ))}
              {editable && <th className="px-4 py-2 text-sm font-semibold text-gray-700">Editar</th>}
              {removable && <th className="px-4 py-2 text-sm font-semibold text-gray-700">Remover</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item, index) => (
              <DefaultRow
                key={item.id || index}
                data={item}
                columns={columns}
                editable={editable}
                removable={removable}
                onEdit={() => handleEditClick(item)}
                onRemove={() => handleRemoveClick(item)}
              />
            ))}
          </tbody>
        </table>
    </div>
    <div className="mt-4">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Adicionar Novo
      </button>
    </div>
    </>
    )}
    <ConfirmDialog
        isOpen={confirmDeleteOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este item? Essa ação não pode ser desfeita."
        confirmText="Excluir"
        type="delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setItemToDelete(null);
          setConfirmDeleteOpen(false);
        }}
      />
      <AlertDialog
        isOpen={alertInfo.isOpen}
        titulo={alertInfo.title}
        mensagem={alertInfo.message}
        onClose={() => setAlertInfo({...alertInfo, isOpen: false})}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <DefaultDataForm
          columns={columns}
          initialData={editingItem}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DefaultDataForm
          columns={columns}
          initialData={{}}
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default MainTable;