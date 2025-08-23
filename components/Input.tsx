import classNames from "./class-names";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <label className="block">
      <span className="text-xs text-slate-100">{label}</span>
      <input {...props} className={classNames(
        "mt-1 block w-full rounded-md border px-3 py-2 text-sm",
        "bg-slate-800/80 text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
      )} />
    </label>
  );
}