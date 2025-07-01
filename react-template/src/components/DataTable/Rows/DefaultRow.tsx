interface RowsProps {
  data: Record<string, any>;
  editable?: boolean;
  removable?: boolean;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}