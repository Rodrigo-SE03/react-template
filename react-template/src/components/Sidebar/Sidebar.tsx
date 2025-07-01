import { NavLink } from "react-router-dom";
import { FaHome, FaWpforms } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const links = [
    { path: "/", label: "Início", icon: <FaHome /> },
    { path: "/form", label: "Formulário", icon: <FaWpforms /> },
    // adicione mais links conforme necessário
  ];

  return (
    <>
      {/* Overlay apenas no mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden h-full fixed md:relative z-40`}
      >
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Menu
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {links.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`
              }
              onClick={onClose} // Fecha ao clicar num link (opcional)
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;