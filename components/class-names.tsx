interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function classNames(...s: (string | boolean | undefined)[]): string {
  return s.filter(Boolean).join(" ");
}