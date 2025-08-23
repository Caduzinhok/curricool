import classNames from "./class-names";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export default function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className="block">
      <span className="text-xs text-slate-100">{label}</span>
      <textarea {...props} className={classNames(
        "mt-1 block w-full rounded-xl border px-3 py-2 text-sm",
        "bg-slate-800/80 text-white focus:outline-none focus:ring-2 focus:ring-black/10 h-32"
      )} />
    </label>
  );
}