import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import type { DataTableColumn } from "../../../types/dataTable";

interface DefaultRowProps {
  data: Record<string, any>;
  columns: DataTableColumn[];
  editable?: boolean;
  removable?: boolean;
  onEdit?: (item: Record<string, any>) => void;
  onRemove?: (item: Record<string, any>) => void;
}

const DefaultRow: React.FC<DefaultRowProps> = ({ data, columns, editable, removable, onEdit, onRemove }) => {
  const renderCell = (value: any, type?: string) => {
    switch (type) {
      case "boolean":
        return value ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />;
      case "money":
        return typeof value === "number" ? `R$ ${value.toFixed(2).replace(".", ",")}` : value;
      default:
        return value;
    }
  };

  return (
    <tr className="border-b hover:bg-gray-100 transition">
      {columns.map(({ key, type }) => (
        <td key={key} className="px-4 py-2 text-sm text-center text-gray-800">
          {renderCell(data[key], type)}
        </td>
      ))}

      {editable && (
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => onEdit?.(data)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
        </td>
      )}

      {removable && (
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => onRemove?.(data)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </td>
      )}
    </tr>
  );
};

export default DefaultRow;