interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

export default function MButton({ children, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {children}
    </button>
  );
}
