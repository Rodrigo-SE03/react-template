import React, { useEffect, useState } from "react";

interface AlertDialogProps {
  isOpen: boolean;
  titulo?: string;
  mensagem: string;
  onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ isOpen, titulo, mensagem, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Caixa de diálogo com fade + deslize */}
      <div
        className={`relative z-10 max-w-sm w-full p-6 bg-white text-black rounded-lg shadow-lg transform transition-all duration-300 ${
          visible && isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {titulo && <h2 className="text-lg font-bold mb-2">{titulo}</h2>}
        <p className="mb-4">{mensagem}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            type="button"
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
