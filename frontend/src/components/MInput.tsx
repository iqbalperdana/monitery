interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
export default function MInput({
  label,
  type,
  value,
  onChange,
  required,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded mt-1"
      />
    </div>
  );
}
