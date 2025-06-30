interface SubmitButtonProps {
  text: string;
  loading?: boolean;
  customClass?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  loading = false,
  customClass = "",
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`px-4 py-2 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed ${customClass}`}
    >
      {loading ? "Enviando..." : text}
    </button>
  );
};

export default SubmitButton;