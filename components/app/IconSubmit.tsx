import { Star, Trash2 } from "lucide-react";

const icons = {
  remove: Trash2,
  primary: Star,
} as const;

export function IconSubmit({
  id,
  action,
  label,
  icon,
  marked = false,
}: {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  label: string;
  icon: keyof typeof icons;
  marked?: boolean;
}) {
  const Icon = icons[icon];
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
          marked ? "text-kb-seal" : "text-kb-muted"
        }`}
        aria-label={label}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} fill={marked ? "currentColor" : "none"} />
      </button>
    </form>
  );
}
