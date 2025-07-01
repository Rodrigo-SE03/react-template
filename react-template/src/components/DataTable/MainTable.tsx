import { getColumns } from "./columns";
import type { TableName } from "../../types/dataTable";

interface MainTableProps {
  tableName: TableName;
  editable?: boolean;
  removable?: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ tableName, editable = true, removable = true }) => {
  const columns = getColumns(tableName);

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                {column.label}
              </th>
            ))}
            {editable && <th className="px-4 py-2"></th>}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;