interface AddBtnProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export const AddBtn = ({ onClick, disabled, children }: AddBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-1 rounded ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
