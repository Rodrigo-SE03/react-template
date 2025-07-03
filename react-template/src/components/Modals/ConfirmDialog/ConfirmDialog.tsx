import React, { useEffect, useState } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  type?: "ok" | "delete";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  type = "ok",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  const confirmBtnClass =
    type === "delete"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Caixa de diálogo */}
      <div
        className={`relative z-10 max-w-sm w-full p-6 bg-white text-black rounded-lg shadow-lg transform transition-all duration-300 ${
          visible && isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {title && <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>}
        <p className="mb-4">{message}</p>
        <div className="flex justify-between gap-2">
          <button
            onClick={onConfirm}
            type="button"
            className={`px-3 py-1 text-white rounded transition ${confirmBtnClass}`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            type="button"
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;